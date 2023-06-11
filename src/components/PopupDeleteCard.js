import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._formContainer = this._popup.querySelector(".popup-form__container");
    this._submitForm = submitForm;
    this._submitButton = this._popup.querySelector(".submit-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._formContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm({element: this._element, elementId: this._elementId});
      this._submitButton.textContent = 'Да...';
    });
  }

  open = ({element, elementId}) => {
    super.open();
    this._element = element;
    this._elementId = elementId;
  }

  setSubmitButtonText() {
    this._submitButton.textContent = 'Да';
  }
}
