import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupDeleteCard from './PopupDeleteCard.js';
import Api from './api.js';

import {
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
  templateSelector,
  formValidateAvatar,
  avatarProfileSelector,
  editProfileAvatar,
  imageProfileAvatarSelector,
  deletePopupSelector,
  //formDelete
 } from './constants.js';

 import '../pages/index.css'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aeec5f00-c84d-4ccf-b0d8-8816b8d86249',
    'Content-Type': 'application/json'
  }
});

//экземпляр попапа данных пользователя
const profileUserInfo = new UserInfo(profileNameSelector, profileJobSelector, imageProfileAvatarSelector);

//экземпляр попапа формы для данных пользователя
const popupWithProfile = new PopupWithForm(profilePopupSelector, (data) => {
  api.setUser(data)
    .then(res => {
      profileUserInfo.setUserInfo({name: res.name, speciality: res.about, avatar: res.avatar})
      popupWithProfile.close();
    })
    .catch((error => console.log(`Допущена ошибка в данных пользователя ${error}`)))
    .finally(() => popupWithProfile.setSubmitButtonText())
})

//экземпляр попапа просмотра изображения
const popupImage = new PopupWithImage(imagePopupSelector);

//экземпляр попапа редактирования аватара
const popupWithAvatar = new PopupWithForm(avatarProfileSelector, (data) => {
  api.setUserAvatar(data)
  .then(res => {
    profileUserInfo.setUserInfo({name: res.name, speciality: res.about, avatar: res.avatar})
    popupWithAvatar.close();
  })
  .catch((error => console.log(`Допущена ошибка при добавлении изображения пользователя ${error}`)))
  .finally(() => popupWithAvatar.setSubmitButtonText());
})

//экземпляр попап удаления карточки
const popupDeleteCard = new PopupDeleteCard(deletePopupSelector, ({element, elementId}) => {
  api.deleteCard(elementId)
  .then(res => {
    element.deleteCard();
    popupDeleteCard.close();
  })
  .catch((error => console.log(`Допущена ошибка при удалении карточки ${error}`)))
  .finally(() => popupDeleteCard.setSubmitButtonText());
})

//экземпляр создания секции для карточек
const section = new Section((item) => {
  section.addItem(createCard(item));
  }, elementListSelector);


//создание карточки
function createCard(item) {
  const card = new Card(item, templateSelector, popupImage.open, popupDeleteCard.open, (element, cardId) => {
    if (element.classList.contains('element-list__icon_active')) {
      api.deleteLike(cardId)
      .then (res => {
        console.log(res)
        card.toggleLikeState(res.likes)
      })
      .catch((error => console.log(`Допущена ошибка при удалении лайка ${error}`)))
    } else {
      api.addLike(cardId)
      .then (res => {
        console.log(res)
        card.toggleLikeState(res.likes)
      })
      .catch((error => console.log(`Допущена ошибка при постановке лайка ${error}`)))
    }
  })
  return card.generateCard();
};

//добавление карточки
const popupWithCard = new PopupWithForm(cardPopupSelector, (data) => {
  Promise.all([api.getUser(), api.addItems(data)])
  .then(([userData, itemsData]) => {
    itemsData.personalId = userData._id;
    section.addItem(createCard(itemsData));
    popupWithCard.close();
  })
  .catch((error => console.log(`Допущена ошибка при добавлении карточки ${error}`)))
  .finally(() => popupWithCard.setSubmitButtonText())
})

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

// открытие попапа редактирования профиля пользователя
editButtonElement.addEventListener('click', ()=> openPopupProfile());

//открытие попапа редактирования фото профиля
editProfileAvatar.addEventListener('click', ()=> {
popupWithAvatar.open();
formValidationAvatar.disableButton();
});

popupWithProfile.setEventListeners();
popupImage.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithCard.setEventListeners();
popupDeleteCard.setEventListeners();

//вызов валидации карточек
const formValidationCard = new FormValidator(validationConfig, formValidateCard);
formValidationCard.enableValidation();

//вызов валидации профайла
const formValidationProfile = new FormValidator(validationConfig, formValidateProfile);
formValidationProfile.enableValidation();

//вызов валидации фото профайла
const formValidationAvatar = new FormValidator(validationConfig, formValidateAvatar);
formValidationAvatar.enableValidation();

Promise.all([api.getUser(), api.getItems()])
  .then(([userData, itemsData]) => {
    profileUserInfo.setUserInfo({name: userData.name, speciality: userData.about, avatar: userData.avatar})
    itemsData.forEach(item => item.personalId = userData._id)
    section.renderItems(itemsData);
  })
  .catch((error => console.log(`Ошибка при загрузке данных ${error}`)))
