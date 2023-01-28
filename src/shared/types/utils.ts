export type MustDefined<T> = {
  [P in keyof T]-?: MustDefined<NonNullable<T[P]>>;
};

export type MustHas<T, K extends keyof T> = Record<K, T[K]> & T;

export type Writeable<T> = { -readonly [P in keyof T]: Writeable<T[P]> };

export type MaybeArray<T> = T | T[];
