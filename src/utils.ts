export const LIST_URL_DIVIDER = ",";

export const isBooleanStringTrue = (value: string) => value === "true";

export const toFloat = (value: any) => parseFloat(value);

export const stringToArray = (value: string): string[] => {
  return value ? value.split(LIST_URL_DIVIDER) : [];
};

export const stringToArrayFloat = (value: string): number[] => {
  return stringToArray(value).map((item) => parseFloat(item));
};

export const arrayToString = (value: string[]): string => {
  return value.join(LIST_URL_DIVIDER);
};

export const numberArrayToString = (value: number[]): string => {
  return arrayToString(value.map((item) => JSON.stringify(item)));
};

export const convertArrayToObject = (
  array: any[],
  id: string | number = "id",
) => {
  return array.reduce((accum, obj) => {
    return { ...accum, [obj[id]]: obj };
  }, {} as any);
};
