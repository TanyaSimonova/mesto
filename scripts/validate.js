const showInputError = (inputSelector, errorMessage) => {
  const errorInput = document.querySelector(`.popup-form__error_${inputSelector.id}`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorInput.textContent = errorMessage;
  errorInput.classList.add(validationConfig.errorClass);
};

const hideInputError = (inputSelector) => {
  const errorInput = document.querySelector(`.popup-form__error_${inputSelector.id}`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorInput.classList.remove(validationConfig.errorClass);
  errorInput.textContent = '';
};

const checkInputValidity = (input) => {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
};

const setEventListeners = (formValidate, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formValidate.querySelectorAll(inputSelector));
  const formButton = formValidate.querySelector(submitButtonSelector);
  disableButton(formButton, rest)

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      if (hasInvalidInput(inputList)) {
        disableButton(formButton, rest)
      } else {
        enableButton(formButton, rest)
      }
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some(item =>!item.validity.valid)
};

const disableButton = (formButton, {inactiveButtonClass, ...rest}) => {
  formButton.classList.add(validationConfig.inactiveButtonClass);
  formButton.disabled = true;
}

const enableButton = (formButton, {inactiveButtonClass, ...rest}) => {
  formButton.classList.remove(validationConfig.inactiveButtonClass);
  formButton.disabled = false;
}

function enableValidation ({formSelector, ...rest}) {
  const popupFormList = Array.from(document.querySelectorAll(formSelector));
  popupFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
     setEventListeners(form, rest);
    });
  }

enableValidation(validationConfig);
