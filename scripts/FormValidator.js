export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._errorSpan = config.errorSpan;
    this._form = form
  }

 _showInputError (errorInput, input) {
    input.classList.add(this._inputErrorClass);
    errorInput.textContent = input.validationMessage;
    errorInput.classList.add(this._errorClass);
  };

  _hideInputError (errorInput, input) {
    input.classList.remove(this._inputErrorClass);
    errorInput.textContent ='';
    errorInput.classList.remove(this._errorClass);
  };

  _checkInputValidity (input) {
    const errorInput = this._form.querySelector(`${this._errorSpan}${input.name}`);
    if (!input.validity.valid) {
      this._showInputError(errorInput, input);
    } else {
      this._hideInputError(errorInput, input);
    }
  };

  _hasInvalidInput () {
    return Array.from(this._inputList).some(input =>!input.validity.valid)
  };

  _disableButton () {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = true;
  }

  _enableButton () {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }

  _setEventListeners () {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(this._inputList)) {
          this._disableButton()
        } else {
          this._enableButton()
        }
      })
    })
  }

  enableValidation () {
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._setEventListeners();

  }
};

