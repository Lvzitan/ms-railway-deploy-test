import _ from "lodash";

/****** VALIDATE FORMATS ******/
export const validateLength = (field, minLength, maxLength) => {
  if (!maxLength) {
    return field.length >= minLength ? true : false;
  } else {
    return field.length >= minLength && field.length <= maxLength
      ? true
      : false;
  }
};

export const validateEmail = (email) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return email.match(validRegex) ? true : false;
};

/****** VALIDATE DATA ******/

export const validateBasicType = (item1, item2) => {
  return item1 === item2 ? true : false;
};

export const validateBasicContent = (item1, item2) => {
  return item1 == item2 ? true : false;
};

export const validateObjectByContent = (obj1, obj2) => {
  return _.isEqual(obj1, obj2);
};

export const validateObjectByStringify = (obj1, obj2) => {
  return JSON.stringify(obj1) !== JSON.stringify(obj2) ? true : false;
};

export const validateArrayByContent = (array1, array2, range) => {
  let status = true;

  for (let i = 0; i < range; i++) {
    if (array1[index] != array2[index]) {
      status = false;
      break;
    }
  }
  return status;
};

export const validateArrayByType = (array1, array2, range) => {
  let status = true;

  for (let i = 0; i < range; i++) {
    if (array1[index] !== array2[index]) {
      status = false;
      break;
    }
  }
  return status;
};
