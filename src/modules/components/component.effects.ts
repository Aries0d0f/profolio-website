import { defineAsyncComponent, markRaw } from 'vue';
import { set, omit } from 'lodash-es';

import uuid from '@/shared/libs/uuid';

import type { State as ComponentState } from './component.service';
import type {
  Component,
  VueComponent,
  VueComponentSet
} from './component.model';

const useComponentEffects$ = (state: ComponentState) => {
  const Initializer = (): void => {
    state.instances = import.meta.glob<VueComponent>('./*/*.vue');
  };

  const Loader = (component: Component): void => {
    const componentSet: VueComponentSet = {
      ...omit(component, 'metadata'),
      instance: state.instances[`./${component.name}.vue`]
    };
    Register(componentSet);
  };

  const Register = (component: VueComponentSet): void => {
    set(state.component, component.name, {
      ...component,
      id: uuid(),
      name: component.name,
      instance: markRaw(
        defineAsyncComponent<VueComponent>(
          () =>
            new Promise((resolve, reject) => {
              try {
                resolve(component.instance());
              } catch (error) {
                reject(error);
              }
            })
        )
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
