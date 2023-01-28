import type { Vector } from '@/shared/types/vector';

export type MathProxy = Math & { ARC_BASE: number };

/*
 * NOTE
 * `ARC_BASE` is a magic number, to approximate the circle arc on Bézier curve.
 * comes from (4 / 3) * Math.tan(Math.PI / (2 * 4)),
 * which is approximately 0.5522847498307933984022516322796.
 * pre-calculated to enhance performance and ensure precision.
 **/
export const ARC_BASE = Number(0.5522847498307935);

const delta = <T extends string>(
  a: Vector<T>,
  b: Vector<T>,
  axis: keyof Vector<T>,
  useVector = false
): number => (useVector ? a[axis] - b[axis] : Math.abs(a[axis] - b[axis]));

const VectorDeltaHandler = {
  get:
    (target: {}, prop: string, receiver: any) =>
    <T extends string>(
      a: Vector<T>,
      b: Vector<T>,
      useVector?: boolean
    ): number => {
      if (
        /([a-zA-Z_0-9]+)/.exec(prop) &&
        Object.prototype.hasOwnProperty.call(a, prop) &&
        Object.prototype.hasOwnProperty.call(b, prop)
      )
        return delta(a, b, prop as T, useVector);
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
