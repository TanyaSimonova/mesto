import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-focus__image');
    this._popupSubtitle = this._popup.querySelector('.popup-focus__subtitle');
  }

  open = (data) => {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.place;
    this._popupSubtitle.textContent = data.place;
    super.open();
  }
}
