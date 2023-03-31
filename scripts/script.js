const editButtonElement = document.querySelector('.edit-button');
const popups = document.querySelectorAll('.popup');
const popupContainerElement = document.querySelector('.popup-form__container');
const nameInput = popupContainerElement.querySelector('.popup-form__input_type_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_type_speciality');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__speciality');
const closeButtons = document.querySelectorAll('.close-button');
const elementList = document.querySelector('.element-list');
const itemTemplate = document.querySelector('.element-list__template').content;
const addButtonElement = document.querySelector('.add-button');
const popupContainerPlace = document.querySelector('.popup-form__container_added');
const placeInput = popupContainerPlace.querySelector('.popup-form__input_type_place');
const linkInput = popupContainerPlace.querySelector('.popup-form__input_type_link');
const popupImageSubtitle = document.querySelector('.popup-focus__subtitle');
const popupImageElement = document.querySelector('.popup-focus__image');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

function openPopup(popups) {
  popups.classList.add('popup_active');
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

editButtonElement.addEventListener('click', ()=> openPopupProfile());

addButtonElement.addEventListener('click', ()=> openPopup(cardPopup));

function closePopup(popups) {
  popups.classList.remove('popup_active');
}
//закрытие всех попапов крестиком
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//редактировать профиль
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

popupContainerElement.addEventListener('submit', handleProfileFormSubmit);

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
  const likeButton = copyElementList.querySelector('.element-list__icon');
  const deleteButton = copyElementList.querySelector('.element-list__delete');
  listImage.src = item.link;
  listImage.alt = item.name;

  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element-list__item').remove();
  });

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element-list__icon_active');
  });
  //открытие конкретной картинки и заголовка
  listImage.addEventListener('click', (evt) => {
    popupImageElement.src = item.link;
    popupImageElement.alt = item.name;
    popupImageSubtitle.textContent = item.name;

    openPopup(imagePopup);
  });

  return copyElementList;
};

//перебор массива с карточками
initialCards.forEach((item) => {
  const cardsArray = addCard(item);
  elementList.prepend(cardsArray);
});

//добавление карточки через форму
popupContainerPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const elementInput = {name: placeInput.value, link: linkInput.value};
  evt.target.reset();
  elementList.prepend(addCard(elementInput));
  closePopup(cardPopup);
});
