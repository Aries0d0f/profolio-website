import { computed, reactive, ref } from 'vue';

import type { InjectionKey } from 'vue';

import {
  createModuleSetup,
  createModuleHook
} from '@/modules/utils/module-factory';
import config from '@/shared/libs/config';

import useThemeEffects$ from './theme.effects';

import type { Theme, UseTheme } from './theme.model';

const PROVIDE_KEY: InjectionKey<UseTheme> = Symbol('Theme');

export interface State {
  theme: Theme | undefined;
}

const useTheme$ = () => {
  const state: State = reactive({
    theme: ref<Theme>()
  });

  const getters = {
    theme: computed(() => state.theme)
  };

  return {
    '#state': config.MODE === 'development' ? state : {},
    ...getters,
    ...useThemeEffects$(state)
  };
};

export const setup = createModuleSetup(PROVIDE_KEY, useTheme$);
export const useTheme = createModuleHook(PROVIDE_KEY, useTheme$);
