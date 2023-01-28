import type { UUID } from '@/shared/libs/uuid';

export abstract class Base {
  abstract id: UUID;
  abstract createTime: Date | string;
  abstract updateTime: Date | string;
}
