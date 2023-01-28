/// <reference lib="webworker" />

import type { ComputedRef } from 'vue';

import { expose } from 'comlink';

export interface Timer {
  Timeout: (delay: number) => Promise<unknown>;
  Repeat: (delay: number, cancel?: ComputedRef<boolean>) => Promise<unknown>;
  Wait: (delay: number, cancel?: ComputedRef<boolean>) => Promise<unknown>;
}

const timer: Timer = {
  Timeout: (delay: number) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('timer');
      }, delay * 1000);
    }),
  Repeat: (delay: number, cancel?: ComputedRef<boolean>) =>
    new Promise((resolve) => {
      const intervalHook = setInterval(() => {
        resolve('timer');

        if (cancel?.value) {
          clearInterval(intervalHook);
        }
      }, delay * 1000);
    }),
  Wait: (delay: number, cancel?: ComputedRef<boolean>) =>
    new Promise((resolve) => {
      const intervalHook = setInterval(() => {
        if (cancel?.value) {
          resolve('timer');
          clearInterval(intervalHook);
        }
      }, delay * 1000);
    })
};

expose(timer, self);

export default null;
