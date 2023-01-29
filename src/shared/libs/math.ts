import type { Vector } from '@/shared/types/vector';
import { fromPairs } from 'lodash-es';

export type MathProxy = Math & {
  ARC_BASE: number;
  Vector: {
    delta: <T extends string>(
      a: Vector<T>,
      b: Vector<T>,
      useVector?: boolean
    ) => number | Vector<T>;
    add: <T extends string>(a: Vector<T>, b: Vector<T>) => Vector<T>;
    minus: <T extends string>(a: Vector<T>, b: Vector<T>) => Vector<T>;
  };
  deg: (rad: number) => number;
  rad: (deg: number) => number;
  gcd: (a: number, b: number) => number;
  lcm: (a: number, b: number) => number;
  clamp: (value: number, min: number, max: number) => number;
};

/*
 * NOTE
 * `ARC_BASE` is a magic number, to approximate the circle arc on Bézier curve.
 * comes from (4 / 3) * Math.tan(Math.PI / (2 * 4)),
 * which is approximately 0.5522847498307933984022516322796.
 * pre-calculated to enhance performance and ensure precision.
 **/
export const ARC_BASE = Number(0.5522847498307935);

const deltaAxis = <T extends string>(
  a: Vector<T>,
  b: Vector<T>,
  axis: keyof Vector<T>,
  useVector = false
): number => (useVector ? a[axis] - b[axis] : Math.abs(a[axis] - b[axis]));

const delta = <T extends string>(
  a: Vector<T>,
  b: Vector<T>,
  useVector = false
): number | Vector<T> => {
  const matrix = Object.keys(a).map((axis) =>
    deltaAxis(a, b, axis as T, useVector)
  );

  return useVector
    ? (fromPairs(
        matrix.map((value, index) => [Object.keys(a)[index], value])
      ) as Vector<T>)
    : Math.pow(
        matrix.reduce((acc, curr) => acc + Math.pow(curr, matrix.length), 0),
        1 / matrix.length
      );
};

const VectorDeltaHandler = {
  get: (target: {}, prop: string, receiver: any) => {
    if (/^delta/.test(prop)) {
      return <T extends string>(
        a: Vector<T>,
        b: Vector<T>,
        useVector?: boolean
      ): number | Vector<T> => {
        if (prop === 'delta') {
          return delta(a, b, useVector);
        }
        return Reflect.get(target, prop, receiver);
      };
    }

    if (prop === 'add') {
      return <T extends string>(a: Vector<T>, b: Vector<T>): Vector<T> =>
        fromPairs(
          Object.keys(a).map((axis) => [axis, a[axis as T] + b[axis as T]]) as [
            T,
            number
          ][]
        ) as Vector<T>;
    }

    if (prop === 'minus') {
      return <T extends string>(a: Vector<T>, b: Vector<T>): Vector<T> =>
        fromPairs(
          Object.keys(a).map((axis) => [axis, a[axis as T] - b[axis as T]]) as [
            T,
            number
          ][]
        ) as Vector<T>;
    }

    return Reflect.get(target, prop, receiver);
  }
};

const Math$: MathProxy = new Proxy<MathProxy>(Math as MathProxy, {
  get(target, prop, receiver) {
    if (prop === 'ARC_BASE') return ARC_BASE;
    if (prop === 'Vector') return new Proxy({}, VectorDeltaHandler);
    if (prop === 'deg') return (rad: number): number => rad * (180 / Math.PI);
    if (prop === 'rad') return (deg: number): number => deg * (Math.PI / 180);
    if (prop === 'gcd')
      return (a: number, b: number): number => (!b ? a : Math$.gcd(b, a % b));
    if (prop === 'lcm')
      return (a: number, b: number): number => (a * b) / Math$.gcd(a, b);
    if (prop === 'clamp')
      return (value: number, min: number, max: number): number =>
        Math.min(Math.max(value, min), max);
    return Reflect.get(target, prop, receiver);
  }
});

export default Math$;
