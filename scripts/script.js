import initialCards from './constants.js';
import Card from './Cards.js';
//import {validationConfig} from './constants.js';

const editButtonElement = document.querySelector('.edit-button');
const popups = document.querySelectorAll('.popup');
const popupContainerElement = document.querySelector('.popup-form__container');
const nameInput = popupContainerElement.querySelector('.popup-form__input_type_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_type_speciality');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__speciality');
const closeButtons = document.querySelectorAll('.close-button');

const elementList = document.querySelector('.element-list');

//const itemTemplate = document.querySelector('.element-list__template').content;
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
const selectorTemplateCard = '#elementListTemplate';

const formValidateCard = document.forms.popupFormCard;


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




const validationConfig = {
  //formSelector: '.popup-form__container',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup-form__error_visible',
  errorSpan: 'popup-form__error_'
};

class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._errorSpan = config.errorSpan;
    this._form = form
  }

 _showInputError (errorInput, input) {
    //this._errorInput = this._form.querySelector(`${this._errorSpan}${this._input.id}`);
    input.classList.add(this._inputErrorClass);
    errorInput.textContent = input.errorMessage;
    errorInput.classList.add(this._errorClass);
  };

  _hideInputError (errorInput, input) {
    //this._errorInput = this._form.querySelector(`${this._errorSpan}${this._input.id}`);
    input.classList.remove(this._inputErrorClass);
    errorInput.textContent ='';
    errorInput.classList.remove(this._errorClass);
  };

  _checkInputValidity (input) {
    const errorInput = this._form.querySelector(`${this._errorSpan}${input.name}`);
    if (!input.validity.valid) {
      this._showInputError(errorInput, input);
    } else {
      this._hideInputError(errorInput, input);
    }
  };

  //_hasInvalidInput () {
 //   return this._inputList.some(item =>!item.validity.valid)
 // };

  //_disableButton () {
  //  this._formButton.classList.add(this._inactiveButtonClass);
  //  this._formButton.disabled = true;
  //}

  //_enableButton () {
 //   this._formButton.classList.remove(this._inactiveButtonClass);
 //   this._formButton.disabled = false;
 // }

  _setEventListeners () {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
       // if (this._hasInvalidInput(this._inputList)) {
       //   this._disableButton()
       // } else {
       //   this._enableButton()
       // }

      } )
    })

  }

  enableValidation () {
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._setEventListeners();

  }


};

const formValidationCard = new FormValidator(validationConfig, formValidateCard);
console.log(formValidationCard);
formValidationCard.enableValidation();

/* _showInputError () {
    this._errorInput = this._form.querySelector(`.popup-form__error_${this._inputSelector.id}`);
    this._inputSelector.classList.add(this._inputErrorClass);
    errorInput.textContent = errorMessage;
    errorInput.classList.add(this._errorClass);
  };

  _hideInputError () {
    this._errorInput = this._form.querySelector(`.popup-form__error_${this._inputSelector.id}`);
    this._inputSelector.classList.remove(this._inputErrorClass);
    errorInput.classList.remove(this._errorClass);
    errorInput.textContent = '';
  };

  _checkInputValidity () {
    if (!input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput () {
    return this._inputList.some(item =>!item.validity.valid)
  };

  _disableButton () {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = true;
  }

  _enableButton () {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }

  _setEventListeners () {
    this._inputList = this._form.querySelectorAll(this._inputSelector),
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._disableButton()

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(this._inputList)) {
          this._disableButton()
        } else {
          this._enableButton()
        }
      })
    })
  }

  enableValidation () {
    //this._inputList = this._form.querySelectorAll(this._inputSelector)
    this._setEventListeners();
  }*/
