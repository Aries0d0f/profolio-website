import type { Optional } from './optional';
import type { Callback } from './callback';

export type GeneralValue = boolean | number | string | Callback;

export type GeneralArray = GeneralValue[] | GeneralArray[] | GeneralMap[];

export interface GeneralMap {
  [key: string]: Optional<GeneralValue | GeneralArray | GeneralMap>;
}

export type OptionalMap<T, R extends keyof T = keyof T> = Omit<T, R> & {
  [P in R]?: T[P];
};

export type ValueOf<T> = T[keyof T];
