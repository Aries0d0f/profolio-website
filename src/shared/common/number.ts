export const padding = (
  num: number,
  padding: number,
  radix = 10,
  useMap = false
) => {
  const { prefix, number } = {
    prefix: '0'.repeat(Math.min(padding - num.toString(radix).length, 0)),
    number: num.toString(radix)
  };

  return useMap ? { prefix, number } : `${prefix}${number}`;
};
