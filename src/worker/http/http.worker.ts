/// <reference lib="webworker" />

import { expose, proxy } from 'comlink';
import { parse as parseYAML } from 'yaml';

type _Response = Response;

export namespace HTTP {
  export type Method = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  export type Response<T> = _Response & {
    json(): Promise<T>;
    yaml(): Promise<T>;
  };
  export type Operator = typeof http;
}

const defaultOptions: Omit<RequestInit, 'body'> = {
  credentials: 'same-origin',
  cache: 'default'
};

const requestHandler: {
  <Context>(
    method: Extract<HTTP.Method, 'HEAD' | 'GET' | 'DELETE'>,
    url: string,
    options?: Omit<RequestInit, 'body'>
  ): Promise<HTTP.Response<Context>>;
  <Context, Payload>(
    method: Exclude<HTTP.Method, 'HEAD' | 'GET' | 'DELETE'>,
    url: string,
    body: Payload,
    options?: Omit<RequestInit, 'body'>
  ): Promise<HTTP.Response<Context>>;
} = async <Context, Payload>(
  method: HTTP.Method,
  url: string,
  body: Payload | never | null = null,
  options?: Omit<RequestInit, 'body'>
): Promise<HTTP.Response<Context>> =>
  fetch(url, {
    method,
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...defaultOptions,
    ...options
  })
    .then((res: Omit<HTTP.Response<Context>, 'yaml'>) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      return res;
    })
    .then((res: Omit<HTTP.Response<Context>, 'yaml'>) =>
      proxy({
        ...res,
        yaml: async () => parseYAML(await res.clone().text())
      })
    );

export const http = {
  request: requestHandler,
  head: async <Context>(url: string, options?: Omit<RequestInit, 'body'>) =>
    await requestHandler<Context>('HEAD', url, options),
  get: async <Context>(url: string, options?: Omit<RequestInit, 'body'>) =>
    await requestHandler<Context>('GET', url, options),
  post: async <Context, Payload>(
    url: string,
    body: Payload,
    options?: Omit<RequestInit, 'body'>
  ) => await requestHandler<Context, Payload>('POST', url, body, options),
  put: async <Context, Payload>(
    url: string,
    body: Payload,
    options?: Omit<RequestInit, 'body'>
  ) => await requestHandler<Context, Payload>('PUT', url, body, options),
  delete: async (url: string, options?: Omit<RequestInit, 'body'>) =>
    await requestHandler<null>('DELETE', url, options),
  patch: async <Context, Payload>(
    url: string,
    body: Payload,
    options?: Omit<RequestInit, 'body'>
  ) => await requestHandler<Context, Payload>('PATCH', url, body, options)
};

expose(http, self);

export default null;
