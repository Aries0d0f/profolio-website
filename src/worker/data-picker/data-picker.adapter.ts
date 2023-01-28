import { wrap } from 'comlink';

import ExistWorker from '@/worker/data-picker/exist.worker?worker';
import SelectorWorker from '@/worker/data-picker/selector.worker?worker';
import ParserWorker from '@/worker/data-picker/parser.worker?worker';

import type { Exist } from './libs/exist';
import type { Selector } from './libs/selector';
import type { Parser } from './libs/parser';

const $ = {
  exist: wrap<Exist>(new ExistWorker()) as unknown as Exist,
  select: wrap<Selector>(new SelectorWorker()) as unknown as Selector,
  parse: wrap<Parser>(new ParserWorker()) as unknown as Parser
};

export default $;
