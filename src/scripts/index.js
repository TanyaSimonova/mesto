import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import {
  initialCards,
  validationConfig,
  editButtonElement,
  addButtonElement,
  formValidateCard,
  formValidateProfile,
  imagePopupSelector,
  elementListSelector,
  profileNameSelector,
  profileJobSelector,
  profilePopupSelector,
  cardPopupSelector
 } from './constants.js';
 import '../pages/index.css'

const profileUserInfo = new UserInfo(profileNameSelector, profileJobSelector);

const popupWithProfile = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();
  profileUserInfo.setUserInfo(popupWithProfile._getInputValues());
  popupWithProfile.close();
})
popupWithProfile.setEventListeners();

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-list__template', popupImage.open);
    return card.generateCard();
  }
}, elementListSelector);
section.renderItems();

const popupWithCard = new PopupWithForm(cardPopupSelector, (evt) => {
  evt.preventDefault();
  section.addItem(popupWithCard._getInputValues());
  popupWithCard.close();
})
popupWithCard.setEventListeners();

//открытие попап профиля
function openPopupProfile() {
  popupWithProfile.setInputValues(profileUserInfo.getUserInfo());
  popupWithProfile.open();
}

//открытие попапа добавления карточек
addButtonElement.addEventListener('click', ()=> {
  popupWithCard.open();
  formValidationCard.disableButton();
  });

editButtonElement.addEventListener('click', ()=> openPopupProfile());

//вызов валидации карточек
const formValidationCard = new FormValidator(validationConfig, formValidateCard);
formValidationCard.enableValidation();

//вызов валидации профайла
const formValidationProfile = new FormValidator(validationConfig, formValidateProfile);
formValidationProfile.enableValidation();
