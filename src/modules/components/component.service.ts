import { computed, reactive } from 'vue';
import { fromPairs, get, toPairs } from 'lodash-es';

import type { InjectionKey } from 'vue';

import {
  createModuleSetup,
  createModuleHook
} from '@/modules/utils/module-factory';
import config from '@/shared/libs/config';

import useComponentEffects$ from './component.effects';

import type {
  Component,
  ComponentSet,
  UseComponent,
  VueComponent
} from './component.model';

const PROVIDE_KEY: InjectionKey<UseComponent> = Symbol('Component');

export interface State {
  component: ComponentSet;
  instances: Record<string, () => Promise<VueComponent>>;
}

const useComponent$ = () => {
  const state: State = reactive({
    component: {},
    instances: {}
  });

  const getters = {
    component: computed(() => state.component),

    get: (name: Component['name']) =>
      computed(() => get(state.component, name)),
    gets: (nameList: Component['name'][]) =>
      computed(() => nameList.map((name) => get(state.component, name))),
    getSet: (set: ComponentSet) =>
      computed(() =>
        fromPairs(
          toPairs(set).map(([name, component]) => [
            name,
            get(state.component, component.name)
          ])
        )
      )
  };

  return {
    '#state': config.MODE === 'development' ? state : {},
    ...getters,
    ...useComponentEffects$(state)
  };
};

export const setup = createModuleSetup(PROVIDE_KEY, useComponent$);
export const useComponent = createModuleHook(PROVIDE_KEY, useComponent$);
