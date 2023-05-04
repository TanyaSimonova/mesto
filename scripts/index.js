import initialCards  from './constants.js';
import Card from './Cards.js';
import FormValidator from './FormValidator.js';

const editButtonElement = document.querySelector('.edit-button');
const popups = document.querySelectorAll('.popup');
const popupContainerElement = document.querySelector('.popup-form__container');
const nameInput = popupContainerElement.querySelector('.popup-form__input_type_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_type_speciality');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__speciality');
const closeButtons = document.querySelectorAll('.close-button');
const elementList = document.querySelector('.element-list');
const addButtonElement = document.querySelector('.add-button');
const popupContainerPlace = document.querySelector('.popup-form__container_added');
const placeInput = popupContainerPlace.querySelector('.popup-form__input_type_place');
const linkInput = popupContainerPlace.querySelector('.popup-form__input_type_link');
const popupImageSubtitle = document.querySelector('.popup-focus__subtitle');
const popupImageElement = document.querySelector('.popup-focus__image');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const submitButtonPlace = popupContainerPlace.querySelector('.submit-button');
const formValidateCard = document.forms.popupFormCard;
const formValidateProfile = document.forms.popupFormProfile;

const validationConfig = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'submit-button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__error_visible',
  errorSpan: '.popup-form__error_'
};

function openPopup(popups) {
  popups.classList.add('popup_active');
  document.addEventListener('keydown', checkAndCloseByEsc);
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

//открытие попап картинки
function openPopupImage(data) {
  popupImageElement.src = data.link;
  popupImageElement.alt = data.name;
  popupImageSubtitle.textContent = data.name;
  openPopup(imagePopup);
}


function closePopup(popups) {
  popups.classList.remove('popup_active');
  document.removeEventListener('keydown', checkAndCloseByEsc);
}

// закрытие попап через ESC
function checkAndCloseByEsc (event)  {
  const eventCheck = event.code;
  if (eventCheck === 'Escape') {
    const popupActive = document.querySelector('.popup_active')
    closePopup(popupActive)
  }
}

//закрытие попапов по оверлею
function checkAndCloseByOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//редактировать профиль
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

//перебор массива с карточками
initialCards.forEach((item) => {
  const card = new Card(item, '.element-list__template', openPopupImage);
  const cardElement = card.generateCard();
  elementList.prepend(cardElement);
});

//добавление карточки через форму
popupContainerPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const elementInput = {name: placeInput.value, link: linkInput.value};
  const card = new Card(elementInput, '.element-list__template', openPopupImage);
  evt.target.reset();
  elementList.prepend(card.generateCard());
  closePopup(cardPopup);
});

//открытие попапа добавления карточек
addButtonElement.addEventListener('click', ()=> {
  submitButtonPlace.classList.add('submit-button_disabled');
  openPopup(cardPopup)
  });

//закрытие всех попапов крестиком
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButtonElement.addEventListener('click', ()=> openPopupProfile());

popups.forEach(popup => popup.addEventListener('click', checkAndCloseByOverlay));

popupContainerElement.addEventListener('submit', handleProfileFormSubmit);

//вызов валидации карточек
const formValidationCard = new FormValidator(validationConfig, formValidateCard);
formValidationCard.enableValidation();

//вызов валидации профайла
const formValidationProfile = new FormValidator(validationConfig, formValidateProfile);
formValidationProfile.enableValidation();
