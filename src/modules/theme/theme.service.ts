import { computed, reactive, ref } from 'vue';
import { useColorMode } from '@vueuse/core';

import type { InjectionKey } from 'vue';
import type { Property } from 'csstype';

import {
  createModuleSetup,
  createModuleHook
} from '@/modules/utils/module-factory';
import config from '@/shared/libs/config';

import useThemeEffects$ from './theme.effects';

import type { Theme, UseTheme } from './theme.model';

const PROVIDE_KEY: InjectionKey<UseTheme> = Symbol('Theme');

export interface State {
  theme: Record<string, Theme>;
  mode: Property.ColorScheme;
}

const useTheme$ = () => {
  const state: State = reactive({
    theme: ref<Record<string, Theme>>({}),
    mode: useColorMode()
  });

  const getters = {
    theme: computed(() => state.theme),
    current: computed(() => state.theme[state.mode] ?? state.theme.default)
  };

  return {
    '#state': config.MODE === 'development' ? state : {},
    ...getters,
    ...useThemeEffects$(state)
  };
};

export const setup = createModuleSetup(PROVIDE_KEY, useTheme$);
export const useTheme = createModuleHook(PROVIDE_KEY, useTheme$);
