export const LIST_URL_DIVIDER = ",";
export const isBooleanStringTrue = (value) => value === "true";
export const toFloat = (value) => parseFloat(value);
export const stringToArray = (value) => {
    return value ? value.split(LIST_URL_DIVIDER) : [];
};
export const stringToArrayFloat = (value) => {
    return stringToArray(value).map((item) => parseFloat(item));
};
export const arrayToString = (value) => {
    return value.join(LIST_URL_DIVIDER);
};
export const numberArrayToString = (value) => {
    return arrayToString(value.map((item) => JSON.stringify(item)));
};
export const convertArrayToObject = (array, id = "id") => {
    return array.reduce((accum, obj) => {
        return { ...accum, [obj[id]]: obj };
    }, {});
};
