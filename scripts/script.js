const editButtonElement = document.querySelector('.edit-button');
let popupForm = document.querySelectorAll('.popup');

//const formProfile = document.querySelector('.popup-form__profile');
//const formElements = document.querySelector('.popup-form__elements');

const popupContainerElement = document.querySelector('.popup-form__container');

const nameInput = popupContainerElement.querySelector('.popup-form__input_type_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_type_speciality');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__speciality');
let closeButtonElement = document.querySelectorAll('.close-button');

const elementList = document.querySelector('.element-list');
const itemTemplate = document.querySelector('.element-list__template').content;

const addButtonElement = document.querySelector('.add-button');
const popupContainerPlace = document.querySelector('.popup-form__container_added');
const placeInput = popupContainerPlace.querySelector('.popup-form__input_type_place');
const linkInput = popupContainerPlace.querySelector('.popup-form__input_type_link');
const placeName = document.querySelector('.element-list__title');
const placeLink = document.querySelector('.element-list__image');

function openPopup(index) {
  popupForm[index].classList.add('popup_active');
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(0);
}

editButtonElement.addEventListener('click', ()=> openPopupProfile());

addButtonElement.addEventListener('click', ()=> openPopup(1));


function closePopup(index) {
  popupForm[index].classList.remove('popup_active');
}

closeButtonElement[0].addEventListener('click', ()=> closePopup(0));
closeButtonElement[1].addEventListener('click', ()=> closePopup(1));

//редактировать профиль
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(0);
}
popupContainerElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(item) {
  const copyElementList = itemTemplate.cloneNode(true);
  const listTitle = copyElementList.querySelector('.element-list__title').textContent = item.name;
  const listImage = copyElementList.querySelector('.element-list__image');
  listImage.src = item.link;
  listImage.alt = item.name;
  return copyElementList;
};


initialCards.forEach((item) => {
  const card = addCard(item);
  elementList.prepend(card);
});

//добавление карточки через форму
popupContainerPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const elementInput = {name: placeInput.value, link: linkInput.value};
  placeInput.value = '';
  linkInput.value = '';
  elementList.prepend(addCard(elementInput));
  closePopup(1);
});



