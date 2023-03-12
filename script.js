const editButtonElement = document.querySelector('.edit-button');
const popupForm = document.querySelector('.popup');
const popupContainerElement = document.querySelector('.popup-form__container');
const formInputElement = popupContainerElement.querySelectorAll('.popup-form__input');

const nameInput = popupContainerElement.querySelector('.popup-form__input_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_speciality');

const submitButtonElement = popupContainerElement.querySelector('.submit-button');
const closeButtonElement = popupContainerElement.querySelector('.close-button');

function openPopup() {
  popupForm.classList.add('popup-opened');
}

editButtonElement.addEventListener('click', openPopup);

function closePopup() {
  popupForm.classList.remove('popup-opened');
}

closeButtonElement.addEventListener('click', closePopup);


function handleFormSubmit (evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__speciality');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

submitButtonElement.addEventListener('click', handleFormSubmit);
