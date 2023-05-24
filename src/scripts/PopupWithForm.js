import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formContainer = this._popup.querySelector(".popup-form__container");
    this._inputForm = this._popup.querySelectorAll(".popup-form__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputForm.forEach(input => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues
  }

  setInputValues(UserInfo) {
    this._inputForm.forEach(input => {
      input.value = UserInfo[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._formContainer.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formContainer.reset();
  }
}

