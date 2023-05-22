export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.close-button')
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.code === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  _handleButtonClose = () => {
    this.close()
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose);
    this._closeButton.addEventListener('click', this._handleButtonClose);
  }
}
