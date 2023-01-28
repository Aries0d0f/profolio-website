import { set, omit } from 'lodash-es';

import useBaseEffects$ from '@/modules/base/base.effects';

import uuid from '@/shared/libs/uuid';

import type { State as ComponentState } from './component.service';
import type {
  Component,
  VueComponent,
  VueComponentSet
} from './component.model';
import { markRaw } from 'vue';

const useComponentEffects$ = (state: ComponentState) => {
  const base$ = useBaseEffects$();

  const Initializer = (): void => {
    state.instances = {
      ...import.meta.glob<VueComponent>('./*/*.vue'),
      ...import.meta.glob<VueComponent>('@/../content/*.component.md')
    };
  };

  const Loader = (component: Component): void => {
    try {
      const instance =
        state.instances[
          /^Content/.exec(component.name)
            ? `/${component.name[0].toLowerCase()}${component.name.slice(
                1
              )}.component.md`
            : `./${component.name}.vue`
        ];

      if (!instance) throw 'NotFound';

      const componentSet: VueComponentSet = {
        ...omit(component, 'metadata'),
        instance
      };
      Register(componentSet);
    } catch (exception) {
      if (!component?.name) {
        throw base$.SErrorf(
          `
          Specified component.name is required when using ComponentEffects$.Loader

          [WANT] <Component>
          [GOT] ${component}

          ${exception}
          `,
          SyntaxError
        );
      } else if (exception === 'NotFound') {
        throw base$.Errorf(
          `Specified component ${component.name} does not exist`,
          ReferenceError,
          `Component Loader: ${component.name}`
        );
      } else {
        throw base$.Errorf(
          `Unhandled Exception: ${exception}`,
          Error,
          `Component Loader: ${component.name}`
        );
      }
    }
  };

  const Register = (component: VueComponentSet): void => {
    set(state.component, component.name, {
      ...component,
      id: uuid(),
      name: component.name,
      instance: markRaw(
        () =>
          new Promise((resolve, reject) => {
            try {
              resolve(component.instance());
            } catch (exception) {
              if (exception instanceof Error) {
                reject(
                  base$.Errorf(
                    exception,
                    Error,
                    `Component Register: ${component.name}`
                  )
                );
              } else {
                reject(
                  base$.Errorf(
                    `Exception: ${exception}`,
                    Error,
                    `Component Register: ${component.name}`
                  )
                );
              }
            }
          })
      )
    });
  };

  return {
    Initializer,
    Loader,
    Register
  };
};

export default useComponentEffects$;
