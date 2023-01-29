import type { ComputedRef } from 'vue';

import { Base } from '@/modules/base/base.model';

import type {
  Component,
  ComponentSet
} from '@/modules/components/component.model';
import type { Assets } from '@/model/asset.model';
import type { GeneralMap } from '@/shared/types/object';

export abstract class Page extends Base {
  abstract name: string;
  abstract path: string;
  abstract description?: string;
  abstract number: number;
  abstract layout: Component;
  abstract header?: Component;
  abstract footer?: Component;
  abstract content?: Component;
  abstract injectable: ComponentSet;
  abstract style: ComponentSet;
  abstract assets: Assets;
  abstract metadata?: GeneralMap;
}

export type PageConfig = Omit<Page, 'number'>;

export type ListPageConfigResponse = {
  pages: PageConfig[];
};

export interface UsePage {
  pages: ComputedRef<Page[]>;
  page: {
    (id: Page['id']): ComputedRef<Page | undefined>;
    (number: Page['number']): ComputedRef<Page | undefined>;
  };

  ListPageConfig(): Promise<void>;
  ListPageConfigSuccess(configs: PageConfig[]): void;
  ListPageConfigError(err: Error): void;
  SetPageNumber(id: Page['id'], number: number): void;
  GenerateRoutes(): void;
}
