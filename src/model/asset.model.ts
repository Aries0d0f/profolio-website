import { Base } from '@/modules/base/base.model';

export abstract class Asset extends Base {
  abstract name: string;
  abstract description?: string;
  abstract link: string;
  abstract type?: string;
  abstract size?: number;
  abstract hash?: string;
  abstract mime?: string;
}

export type Assets = {
  [key: string]: Asset;
};
