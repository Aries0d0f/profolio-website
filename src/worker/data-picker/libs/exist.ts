import { isEmpty } from 'lodash-es';
import XRegExp from 'xregexp';

import { parser, templateRegExp } from './parser';
import { selector } from './selector';

import type { GeneralMap } from '@/shared/types/object';

export const exist = <T extends GeneralMap>(
  datasets: T,
  keys: string
): boolean =>
  !isEmpty(
    XRegExp.test(keys, templateRegExp)
      ? parser(datasets, keys)
      : selector<T>(datasets, keys)
  );

export type Exist = typeof exist;
