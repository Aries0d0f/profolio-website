import { fromPairs } from 'lodash-es';

import $ from '@/worker/data-picker/data-picker.adapter';

import type { GeneralMap } from '@/shared/types/object';

export const additionalProperties = (
  payload: {
    attr: string;
    ref?: string;
    value?: any;
    parse?: boolean;
  }[],
  datasets: GeneralMap
): GeneralMap =>
  fromPairs(
    payload?.map(({ attr, ref, value, parse }) => [
      attr,
      ref
        ? $.select(datasets, ref)
        : parse
        ? typeof value === 'string' || typeof value === 'number'
          ? $.parse(datasets, String(value))
          : JSON.parse($.parse(datasets, JSON.stringify(value)))
        : value
    ]) ?? []
  );
