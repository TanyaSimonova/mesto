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
  cardPopupSelector,
  templateSelector
 } from './constants.js';
 import '../pages/index.css'

const profileUserInfo = new UserInfo(profileNameSelector, profileJobSelector);

const popupWithProfile = new PopupWithForm(profilePopupSelector, (data) => {
  profileUserInfo.setUserInfo(data);
})
popupWithProfile.setEventListeners();

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createCard(item));
  },
}, elementListSelector);

section.renderItems();

function createCard(item) {
  const card = new Card(item, templateSelector, popupImage.open);
  return card.generateCard();
};

//добавление карточки
const popupWithCard = new PopupWithForm(cardPopupSelector, (data) => {
  section.addItem(createCard(data));
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
