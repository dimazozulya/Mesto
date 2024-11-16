import './style.css';

import logo from '../images/logo.svg';
import profileImg from '../images/profile__img.jpg';
import closeIcon from '../images/close-icon.svg';
import pencilIcon from '../images/Vector-pencil.svg';
import {Card, CardForm} from '../js/card.js';
import PopupWithForm from '../js/PopupWithForm.js';
import PopupWithImage from '../js/PopupWithImage.js';
import Section from '../js/Section.js';
import UserInfo from '../js/UserInfo.js';
import FormValidator from '../js/FormValidator.js';
import { initialCards } from '../js/constants.js';

document.querySelector('.profile__name-pencil').src = pencilIcon;
document.querySelector('.header__image').src = logo;
document.querySelector('.profile__img').src = profileImg;
document.querySelectorAll('.close__icon').forEach((btn) => {
  btn.src = closeIcon;
});

const formProfile = new FormValidator('#form', '.popup__input', '.popup__submit-button', '.error-message');
const formCard = new FormValidator('#form-card', '.popup__input', '.popup__submit-button-card', '.error-message');
const popupWithImage = new PopupWithImage('#popup-image');
popupWithImage.setEventListeners();

const renderer = (item) => {
  const card = new Card(item.name, item.link, '#card', (link, name) => {
    popupWithImage.open(link, name);
  });
  section.addItem(card.generateCard());
};

const section = new Section({ items: initialCards, renderer: renderer }, '#content');
section.renderItems();

new CardForm('#form-card', '#card', 'popup-card', section);

const userInfo = new UserInfo({
  nameSelector: '.profile__name-text',
  jobSelector: '.profile__subtitle',
});

const profilePopup = new PopupWithForm(
  '#popup-profile',
  '#form',
  '.popup__input',
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);

document.querySelector('.profile__name-btn').addEventListener('click', () => {
  profilePopup.open(); 
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(
  '#popup-card',      
  '#form-card',                
  '.popup__input',       
  (formData) => {
    const nameElement = document.querySelector('.profile__name-text');
    const jobElement = document.querySelector('.profile__subtitle');

    if (formData.name) {
      nameElement.textContent = formData.name;
    }
    if (formData.job) {
      jobElement.textContent = formData.job;
    }
  },
  {
    name: document.querySelector('.profile__name-text'),
    job: document.querySelector('.profile__subtitle')
  }
);

profilePopup.setEventListeners(); 

document.querySelector('.profile__name-btn').addEventListener('click', () => {
  profilePopup.open();
});

document.querySelector('.profile__btn').addEventListener('click', () => { 
  cardPopup.open()
});

formProfile.enableValidation();
formCard.enableValidation();

