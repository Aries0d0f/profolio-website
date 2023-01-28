export const fallback = <T>(value: T | undefined | null, fallback: T): T =>
  value === undefined || value === null ? fallback : value;
