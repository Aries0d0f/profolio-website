import type { ComputedRef } from 'vue';

import type { GeneralMap } from '@/shared/types/object';
import type { UUID } from '@/shared/libs/uuid';

export type VueComponent = typeof import('*.vue');

export abstract class Component {
  abstract id: UUID;
  abstract name: string;
  abstract instance: VueComponent;
  abstract metadata?: GeneralMap;
}

export type VueComponentSet = Pick<Component, 'name' | 'metadata'> & {
  instance: () => Promise<VueComponent>;
};

export interface ComponentSet {
  [key: string]: Component;
}

export interface UseComponent {
  component: ComputedRef<ComponentSet>;

  get: (name: Component['name']) => ComputedRef<Component>;
  gets: (nameList: Component['name'][]) => ComputedRef<Component[]>;
  getSet: (set: ComponentSet) => ComputedRef<ComponentSet>;

  Initializer: () => void;
  Loader(component: Component): void;
  Register(component: VueComponentSet): void;
}
