/// <reference lib="webworker" />

import { expose } from 'comlink';

import { parser } from './libs/parser';

expose(parser, self);
