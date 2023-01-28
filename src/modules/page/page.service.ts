import { computed, reactive } from 'vue';
import { includes } from 'lodash-es';

import type { InjectionKey } from 'vue';

import {
  createModuleSetup,
  createModuleHook
} from '@/modules/utils/module-factory';
import config from '@/shared/libs/config';

import usePageEffects$ from './page.effects';

import type { Page, UsePage } from './page.model';
import type { GeneralValue } from '@/shared/types/object';

const PROVIDE_KEY: InjectionKey<UsePage> = Symbol('Page');

export interface State {
  pages: Page[];
}

const usePage$ = () => {
  const state: State = reactive({
    pages: []
  });

  const getters = {
    pages: computed(() => state.pages),
    page: (selector: Page['id'] | Page['number']) =>
      computed(() =>
        state.pages.find(
          (page) =>
            page.id === selector ||
            page.number === selector ||
            includes(page.metadata?.hook as GeneralValue[], selector)
        )
      )
  };

  return {
    '#state': config.MODE === 'development' ? state : {},
    ...getters,
    ...usePageEffects$(state)
  };
};

export const setup = createModuleSetup(PROVIDE_KEY, usePage$);
export const usePage = createModuleHook(PROVIDE_KEY, usePage$);
