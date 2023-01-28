import type { Vector } from '@/shared/types/vector';
import { fromPairs } from 'lodash-es';

export type MathProxy = Math & {
  ARC_BASE: number;
  Vector: {
    delta: {
      (): Record<
        string,
        <T extends string>(
          a: Vector<T>,
          b: Vector<T>,
          useVector?: boolean
        ) => number
      >;
      (): <T extends string>(
        a: Vector<T>,
        b: Vector<T>,
        useVector?: boolean
      ) => number | Vector<T>;
    };
  };
};

/*
 * NOTE
 * `ARC_BASE` is a magic number, to approximate the circle arc on Bézier curve.
 * comes from (4 / 3) * Math.tan(Math.PI / (2 * 4)),
 * which is approximately 0.5522847498307933984022516322796.
 * pre-calculated to enhance performance and ensure precision.
 **/
export const ARC_BASE = Number(0.5522847498307935);

const deltaAsix = <T extends string>(
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
    deltaAsix(a, b, axis as T, useVector)
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
  get:
    (target: {}, prop: string, receiver: any) =>
    <T extends string>(
      a: Vector<T>,
      b: Vector<T>,
      useVector?: boolean
    ): number | Vector<T> => {
      if (
        /delta\.([a-zA-Z_0-9]+)/.exec(prop) &&
        Object.prototype.hasOwnProperty.call(a, prop) &&
        Object.prototype.hasOwnProperty.call(b, prop)
      ) {
        return deltaAsix(a, b, prop as T, useVector);
      } else if (prop === 'delta') {
        return delta(a, b, useVector);
      }
      return Reflect.get(target, prop, receiver);
    }
};

const Math$: MathProxy = new Proxy<MathProxy>(Math as MathProxy, {
  get(target, prop, receiver) {
    if (prop === 'ARC_BASE') return ARC_BASE;
    if (prop === 'Vector') return VectorDeltaHandler;
    return Reflect.get(target, prop, receiver);
  }
});

export default Math$;
