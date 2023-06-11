export default class Card {
  constructor(data, selectorTemplateCard, openPopupImage, openDeletePopup, changeLike) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesArrey = data.likes.length;
    this._personalId = data.personalId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._selectorTemplateCard = selectorTemplateCard;
    this._openPopupImage = openPopupImage;
    this._openDeletePopup = openDeletePopup;
    this._changeLike = changeLike;
  }

  _getTemplate() {
    return document
    .querySelector(this._selectorTemplateCard)
    .content
    .querySelector('.element-list__item')
    .cloneNode(true);
  }

  _handleListImage = () => {
    this._openPopupImage(this._data);
  }

  _handleLikeButton = () => {
    this._changeLike(this._likeButton, this._cardId);
  }

  _handleDeleteButton = () => {
    this._openDeletePopup({element: this, elementId: this._cardId});
   }


  _setEventListener() {
    this._listImage.addEventListener('click', this._handleListImage);
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
  }

  deleteCard() {
    this._elementCopy.remove();
    this._elementCopy = null;
  }

  _checkAndSetDeleteButton() {
    this._personalId === this._ownerId ? this._deleteButton.style.display = 'block' : this._deleteButton.style.display = 'none'
  }

  _checkAndScoreLikes() {
    this._likes.forEach(item => {
      if (item._id === this._personalId) {
        this._likeButton.classList.add('element-list__icon_active');
      }
    })
    this._scoreNumber.textContent = this._likesArrey
  }

  toggleLikeState(item) {
    this._likeButton.classList.toggle('element-list__icon_active');
    this._scoreNumber.textContent = item.length;

  }

  generateCard() {
    this._elementCopy = this._getTemplate();

    this._elementCopy.querySelector('.element-list__title').textContent = this._name;
    this._listImage = this._elementCopy.querySelector('.element-list__image');
    this._likeButton = this._elementCopy.querySelector('.element-list__icon');
    this._scoreNumber = this._elementCopy.querySelector('.element-list__score');
    this._deleteButton = this._elementCopy.querySelector('.element-list__delete');
    this._listImage.alt = this._name;
    this._listImage.src = this._link;
    this._checkAndScoreLikes();
    this._checkAndSetDeleteButton();
    this._setEventListener();

    return this._elementCopy;
  }
};
