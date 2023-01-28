export const enumMapping = <Payload, Enum>(
  item: Payload,
  type: Enum,
  key: keyof Payload
): Payload => ({
  ...item,
  [key]: type[item[key] as unknown as keyof Enum]
});
