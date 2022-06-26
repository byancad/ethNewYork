export const isClient = () => {
  return typeof window != "undefined";
};

export const ellipsisString = (str: string) => {
  return str.length > 20
    ? str.substring(0, 6) +
        " ... " +
        str.substring(str.length - 6, str.length - 1)
    : str;
};
