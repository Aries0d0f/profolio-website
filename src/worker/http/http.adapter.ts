import { wrap } from 'comlink';

import HttpWorker from '@/worker/http/http.worker?worker';

import type { HTTP } from '@/worker/http/http.worker';

const http = wrap<HTTP.Operator>(new HttpWorker()) as unknown as HTTP.Operator;

export default http;
