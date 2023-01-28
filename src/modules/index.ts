import { useCtx } from '@/modules/utils/context/context.service';

import type { Module } from './types';

function execModulesMethod(
  modulesOrder: string[],
  method: string,
  ...args: any[]
) {
  const filtered = Object.entries(
    import.meta.glob<true, string, Module>('./**/*.service.ts', { eager: true })
  ).filter(([_, module]) => module[method]);
  const OTHERS_INDEX = filtered.length;

  filtered
    .map<[string, Module]>(([filename, module]) => [
      filename.replace(/\.\/(.+)\.service\.ts/, `$1`),
      module
    ])
    .sort(([nameA], [nameB]) => {
      const indexA = modulesOrder.includes(nameA)
        ? modulesOrder.indexOf(nameA)
        : OTHERS_INDEX;
      const indexB = modulesOrder.includes(nameB)
        ? modulesOrder.indexOf(nameB)
        : OTHERS_INDEX;
      return indexA - indexB;
    })
    .forEach(([_, module]) => {
      module[method](...args);
    });
}

export const setupModules = () => {
  const ctx = useCtx();
  execModulesMethod([], 'setup', ctx);
};
