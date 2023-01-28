/// <reference lib="webworker" />

import { expose } from 'comlink';

import { exist } from './libs/exist';

expose(exist, self);
