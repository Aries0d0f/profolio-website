import { v4 as UUIDv4 } from 'uuid';

export type UUID = ReturnType<typeof UUIDv4> & {
  readonly _UUID: unique symbol;
};

export const uuid: {
  (): UUID;
  (str: string, skipCheck?: boolean): UUID;
} = (str?: string, skipCheck?: boolean): UUID => {
  if (str) {
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        str
      ) ||
      skipCheck
    ) {
      return str as UUID;
    } else {
      throw new Error(`Invalid UUID format: ${str}`);
    }
  }
  return UUIDv4() as UUID;
};

export const NilUUID = uuid('00000000-0000-0000-0000-000000000000');

export default uuid;
