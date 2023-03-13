const editButtonElement = document.querySelector('.edit-button');
const popupForm = document.querySelector('.popup');
const popupContainerElement = document.querySelector('.popup-form__container');
const nameInput = popupContainerElement.querySelector('.popup-form__input_type_name');
const jobInput = popupContainerElement.querySelector('.popup-form__input_type_speciality');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__speciality');
const closeButtonElement = popupForm.querySelector('.close-button');

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
