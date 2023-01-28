import { get, isEmpty } from 'lodash-es';

import type { GeneralMap } from '@/shared/types/object';
import type { Optional, Nullable, ValueOf } from '@/shared/types/optional';

export const selector = <T extends GeneralMap = GeneralMap>(
  datasets: Optional<T>,
  selector: Optional<string | number>
): Nullable<ValueOf<T>> =>
  isEmpty(datasets) || isEmpty(selector)
    ? null
    : get(datasets, selector!) ?? null;

export type Selector = typeof selector;
