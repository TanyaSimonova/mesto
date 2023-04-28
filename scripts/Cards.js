export default class Card {
  constructor(data, selectorTemplateCard, openPopupImage) {
    this._data = data,
    this._name = data.name,
    this._link = data.link,
    this._selectorTemplateCard = selectorTemplateCard,
    this._openPopupImage = openPopupImage
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._selectorTemplateCard)
    .content
    .querySelector('.element-list__item')
    .cloneNode(true);

    return cardElement;
  }

  _handleListImage = (evt) => {
    this._openPopupImage(this._data);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('element-list__icon_active');
  }

  _handleDeleteButton(evt) {
    evt.target.closest('.element-list__item').remove();
  }

  _setEventListener() {
    this._listImage.addEventListener('click', this._handleListImage);
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element-list__title').textContent = this._name;
    this._listImage = this._element.querySelector('.element-list__image');
    this._likeButton = this._element.querySelector('.element-list__icon');
    this._deleteButton = this._element.querySelector('.element-list__delete');
    this._listImage.alt = this._name;
    this._listImage.src = this._link;

    this._setEventListener();

    return this._element;
  }
};
