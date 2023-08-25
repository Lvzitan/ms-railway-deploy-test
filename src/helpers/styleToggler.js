//THIS CLASS ADDS DISPLAY FLEX TO THE ERROR MESSAGE AFTER THE INPUT
//ex: .error-input + p

export const addErrInputText = (inputDomEl) => {
  inputDomEl.classList.add("error-input");
};
export const removeErrInputText = (inputDomEl) => {
  inputDomEl.classList.remove("error-input");
};
