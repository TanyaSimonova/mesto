/*const validationConfig = {
  formSelector: '.popup-form__container',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup-form__error_visible'
};*/

class FormValidator {
  constructor(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, form) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form
  }

 _showInputError = () => {
    this._errorInput = this._form.querySelector(`.popup-form__error_${this._inputSelector.id}`);
    this._inputSelector.classList.add(this._inputErrorClass);
    errorInput.textContent = errorMessage;
    errorInput.classList.add(validationConfig.errorClass);
  };

  _hideInputError = () => {
    this._errorInput = this._form.querySelector(`.popup-form__error_${this._inputSelector.id}`);
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorInput.classList.remove(this._errorClass);
    errorInput.textContent = '';
  };

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some(item =>!item.validity.valid)
  };


  _disableButton = () => {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = true;
  }

  _enableButton = () => {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._disableButton()

    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(inputList)) {
          this._disableButton()
        } else {
          this._enableButton()
        }
      });
    });
  };

  enableValidation () {
    this._popupFormList = Array.from(form.querySelectorAll(this._formSelector));
    popupFormList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
       setEventListeners();
      });
    }

};

const formValidationCard = new FormValidator(validationConfig, )
formValidationCard.enableValidation();




/*const showInputError = (inputSelector, errorMessage) => {
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

enableValidation(validationConfig);*/
