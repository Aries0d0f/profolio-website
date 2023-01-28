export type Optional<T> = T | undefined | null;

export type Nullable<T> = T | null;

export type ValueOf<T> = T[keyof T];

export type OnlyOne<T, K extends keyof T> = {
  [key in Exclude<keyof T, K>]+?: undefined;
} & Pick<T, K>;

export type OnlyOneByKey<T> = ValueOf<{ [key in keyof T]: OnlyOne<T, key> }>;

export type OnlyOneOf<T, K extends keyof T> = OnlyOneByKey<Pick<T, K>> &
  Omit<T, K>;

export type AtLeastOne<T, R extends keyof T = keyof T> = Omit<T, R> &
  { [P in R]: Required<Pick<T, P>> & Partial<Omit<T, P>> }[R];

export type AtLeastOneOptional<T, R extends keyof T = keyof T> = Omit<T, R> &
  { [P in R]: Optional<Pick<T, P>> & Partial<Omit<T, P>> }[R];

export type OneOf<T, R extends keyof T = keyof T> = Pick<T, R>;
