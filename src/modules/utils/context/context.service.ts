import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { isClient } from '@vueuse/shared';

import type { Context } from './context.model';

export const useCtx = (): Context => {
  return {
    app: getCurrentInstance()!.appContext.app,
    router: useRouter(),
    isClient
  };
};
