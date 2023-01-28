import { last, without, flatMap, join } from 'lodash-es';
import { format } from 'date-fns';
import XRegExp from 'xregexp';

import type { NamedGroupsArray } from 'xregexp';

import { padding } from '@/shared/common/number';
import { md } from '@/shared/libs/markdown';
import { selector } from './selector';

import type { GeneralMap } from '@/shared/types/object';

const tailingRegExp = XRegExp.build(`[^\\{\\}]*`, {}, 'gmx');
const argRegExp = XRegExp.build(`[^'\v\t]+`, {}, 'gmx');
const argsRegExp = XRegExp.build(
  `
    (?:
      ('({{arg}})')?
      (?:[ \t]*[\\:][ \t]*)?
    )*
  `,
  { arg: argRegExp },
  'gmx'
);
const pipeRegExp = XRegExp.build(`[^\\:\\(\\)\\{\\}\v \t]+`, {}, 'gmx');
const selectorRegExp = XRegExp.build(`[^\\:\\|\\(\\)\\{\\}\v \t]+`, {}, 'gmx');
const operatorRegExp = XRegExp.build(
  `
    [ \\(]*[ \t]*
      ({{selector}})
    ([ \t]*[\\|][ \t]*
      ({{pipe}})
      (?:[ \t]*[\\:][ \t]*)?
      ({{args}})
    )*
    ([ \t](?=\\))*)?[ \\)]*
    ({{tailing}})
  `,
  {
    selector: selectorRegExp,
    tailing: tailingRegExp,
    pipe: pipeRegExp,
    args: argsRegExp
  },
  'gmx'
);

export const templateRegExp = XRegExp.build(
  `
    (\\{\\{[ \t]*
      ({{operator}})
    [ \t](?=\\})*\\}\\})
  `,
  { operator: operatorRegExp },
  'gmx'
);

export const parser = (datasets: GeneralMap, str: string): any =>
  str
    ? XRegExp.replace(
        str,
        templateRegExp,
        (...args) => {
          const groups = last(args) as NamedGroupsArray | undefined;
          const params = without(
            flatMap([XRegExp.match(groups?.args ?? '', argRegExp) ?? []]),
            ':',
            ' : ',
            ''
          );
          const data = selector<any>(datasets, groups?.selector);

          let result = data;

          try {
            if (groups?.pipe && data) {
              switch (groups.pipe) {
                case 'datetime':
                  result = format(
                    new Date(data as Date),
                    String(params?.[0] ?? 'yyyy-MM-dd')
                  );
                  break;
                case 'padding':
                  if (!params?.[0]) break;
                  result = padding(
                    data as number,
                    parseInt(String(params[0]), 10)
                  );
                  break;
                case 'markdown':
                case 'md':
                  result = md[
                    params?.[0] === 'html' || params?.[0] === 'collection'
                      ? params[0]
                      : 'html'
                  ](data as string);
                  break;
                case 'json':
                  result = JSON.parse(data);
                  break;
                case 'stringify':
                  result = JSON.stringify(data);
                  break;
                case 'trim':
                  result = (data as string).trim();
                  break;
                case 'upper':
                  result = (data as string).toUpperCase();
                  break;
                case 'lower':
                  result = (data as string).toLowerCase();
                  break;
                case 'capitalize':
                  result = (data as string).replace(/\b\w/g, (l) =>
                    l.toUpperCase()
                  );
                  break;
                case 'join':
                  result = join(data, params?.[0]);
                  break;
                default:
                  break;
              }
            }

            if (groups?.tailing) {
              result = parser(
                { ...datasets, result },
                `{{ result${groups.tailing} }}`
              );
            }
          } catch (error) {
            return error;
          }

          return result;
        },
        'all'
      )
    : '';

export type Parser = typeof parser;
