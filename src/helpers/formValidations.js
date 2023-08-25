import { validateLength } from "./validator";
import { addErrInputText, removeErrInputText } from "./styleToggler";

export const validateForm = (arrayOfElements, infoToValidate) => {
  const expectedSize = arrayOfElements.length;
  let counter = 0;

  arrayOfElements.forEach((element, index) => {
    validateLength(infoToValidate[index], 1)
      ? counter++
      : addErrInputText(element);
  });

  return expectedSize === counter;
};
