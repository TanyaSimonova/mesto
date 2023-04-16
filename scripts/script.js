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
const submitButtonPlace = popupContainerPlace.querySelector('.submit-button');

function openPopup(popups) {
  popups.classList.add('popup_active');
  document.addEventListener('keydown', checkAndCloseByEsc);
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
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
