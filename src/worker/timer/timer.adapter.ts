import { wrap } from 'comlink';

import TimerWorker from '@/worker/timer/timer.worker?worker';

import type { Timer } from './timer.worker';

const timer = wrap<Timer>(new TimerWorker());

export default timer;
