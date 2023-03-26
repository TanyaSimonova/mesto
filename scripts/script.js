const editButtonElement = document.querySelector('.edit-button');
const popupForm = document.querySelector('.popup');
const popupContainerElement = document.querySelector('.popup-form__container');
const nameInput = popupContainerElement.querySelector('.popup-form__input_type_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_type_speciality');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__speciality');
const closeButtonElement = popupForm.querySelector('.close-button');

const elementList = document.querySelector('.element-list');
const itemTemplate = document.querySelector('.element-list__template').content;

function openPopup() {
  popupForm.classList.add('popup_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButtonElement.addEventListener('click', openPopup);

function closePopup() {
  popupForm.classList.remove('popup_active');
}

closeButtonElement.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}
popupContainerElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    description: 'весенний вид на Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    description: 'зимняя река на Урале'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    description: 'жилой район советских панелек'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    description: 'камчатские сопки ранней весной'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    description: 'железная дорога уходит вдаль лесных просторов'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    description: 'побережье Байкала зимой'
  }
];

initialCards.forEach(renderElementsList)

function renderElementsList(item) {
  const copyElementList = itemTemplate.cloneNode(true);
  copyElementList.querySelector('.element-list__title').textContent = item.name;
  copyElementList.querySelector('.element-list__image').src = item.link;
  copyElementList.querySelector('.element-list__image').alt = item.description;
  elementList.append(copyElementList);
}
