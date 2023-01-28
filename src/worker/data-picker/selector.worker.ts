/// <reference lib="webworker" />

import { expose } from 'comlink';

import { selector } from '@/worker/data-picker/libs/selector';

expose(selector, self);
