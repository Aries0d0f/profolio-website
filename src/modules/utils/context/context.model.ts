import type { App } from 'vue';
import type { Router } from 'vue-router';

export type Context = {
  app: App<Element>;
  router: Router;
  isClient: boolean;
};
