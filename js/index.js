import FormValidator from './FormValidator.js';
import { Card, CardForm } from './card.js';
import { initialCards } from './constants.js';

const modal = document.getElementById('popup-profile');
const closeButton = document.querySelector('.popup__close-btn');
const openButton = document.querySelector('.profile__name-btn');
const modalCard = document.getElementById('popup-card');
const closeButtonCard = document.querySelector('.popup__close-btn-card');
const openButtonCard = document.querySelector('.profile__btn');
const formElement = document.querySelector('#form');
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');
const saveButton = document.querySelector('.popup__submit-button');

function openModal() {
  modal.classList.add('popup_active');
  window.addEventListener('keydown', handleEscClose); 
}

function closeModal() {
  modal.classList.remove('popup_active');
  window.removeEventListener('keydown', handleEscClose); 
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

closeButton.addEventListener('click', closeModal);
openButton.addEventListener('click', openModal);


window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  };
});

function openModalCard() {
  modalCard.classList.add('popup_active');
  window.addEventListener ('keydown', handleEscCloseCard);
};
function closeModalCard() {
  modalCard.classList.remove('popup_active');
  window.removeEventListener ('keydown', handleEscCloseCard);
};

function handleEscCloseCard(event){
  if (event.key === 'Escape'){
    closeModalCard();
  }
}
closeButtonCard.addEventListener('click', closeModalCard);
openButtonCard.addEventListener('click', openModalCard);

window.addEventListener('click', function(event) {
  if (event.target === modalCard) {
    closeModalCard();
  }
});

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const nameDisplay = document.querySelector('.profile__name-text');
    const jobDisplay = document.querySelector('.profile__subtitle');

    nameDisplay.textContent = nameValue;
    jobDisplay.textContent = jobValue;
};


formElement.addEventListener('submit', handleFormSubmit);
saveButton.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '#card');
    document.querySelector('#content').append(card.generateCard());
  });
  const cardForm = new CardForm('#form-card', '#content', '#card', 'popup-card');
});

document.addEventListener('DOMContentLoaded', () => {
  const formProfile = new FormValidator('#form', '.popup__input', '.popup__submit-button', '.error-message');
  const formCard = new FormValidator('#form-card', '.popup__input', '.popup__submit-button-card', '.error-message');
  formProfile.enableValidation();
  formCard.enableValidation();
});