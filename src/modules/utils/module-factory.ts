import { inject } from 'vue';

import type { InjectionKey } from 'vue';

import { useCtx } from './context/context.service';

export function createModuleSetup<T, Args extends any[]>(
  PROVIDE_KEY: InjectionKey<T>,
  setup: (...args: Args) => T,
  fallback?: T
) {
  return (...args: Args) => {
    let provided;
    const { app } = useCtx();

    if (fallback) provided = fallback;
    else provided = setup(...args);

    app.provide(PROVIDE_KEY, provided);

    return provided;
  };
}

export function createModuleHook<T, Args extends any[]>(
  PROVIDE_KEY: InjectionKey<T>,
  setup: (...args: Args) => T,
  fallback?: T
) {
  return (...args: Args) => {
    let provided = inject<T>(PROVIDE_KEY);

    if (provided) return provided;

    const { app } = useCtx();

    if (fallback) provided = fallback;
    else provided = setup(...args);

    app.provide(PROVIDE_KEY, provided);

    return provided;
  };
}
