import type { ComputedRef, InjectionKey } from 'vue';

import type { Theme } from '@/modules/theme/theme.model';

export type UsePreferences = {
  theme: ComputedRef<Theme | undefined>;
};

export const PROVIDE_PREFERENCES: InjectionKey<UsePreferences> =
  Symbol('Preferences');
