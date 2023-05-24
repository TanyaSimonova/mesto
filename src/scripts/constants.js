const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'submit-button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__error_visible',
  errorSpan: '.popup-form__error_'
};

const editButtonElement = document.querySelector('.edit-button');
const addButtonElement = document.querySelector('.add-button');
const formValidateCard = document.forms.popupFormCard;
const formValidateProfile = document.forms.popupFormProfile;
const imagePopupSelector = '.image-popup';
const elementListSelector = '.element-list';
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__speciality';
const profilePopupSelector = '.profile-popup';
const cardPopupSelector = '.card-popup';
const templateSelector = '.element-list__template';

export {
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
 };
