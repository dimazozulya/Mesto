// import './style.css';

// import Api from '../js/Api.js';
// import logo from '../images/logo.svg';
// import profileImg from '../images/profile__img.jpg';
// import closeIcon from '../images/close-icon.svg';
// import pencilIcon from '../images/Vector-pencil.svg';
// import Card from '../js/Card.js';
// import CardForm from '../js/CardForm.js';
// import PopupWithForm from '../js/PopupWithForm.js';
// import PopupWithImage from '../js/PopupWithImage.js';
// import Section from '../js/Section.js';
// import UserInfo from '../js/UserInfo.js';
// import FormValidator from '../js/FormValidator.js';

// // Установка иконок
// document.querySelector('.profile__name-pencil').src = pencilIcon;
// document.querySelector('.header__image').src = logo;
// document.querySelector('.profile__img').src = profileImg;
// document.querySelectorAll('.close__icon').forEach((btn) => {
//   btn.src = closeIcon;
// });

// let section
// // Валидация форм
// const formProfile = new FormValidator('#form', '.popup__input', '.popup__submit-button', '.error-message');
// const formCard = new FormValidator('#form-card', '.popup__input', '.popup__submit-button-card', '.error-message');
// formProfile.enableValidation();
// formCard.enableValidation();

// // Работа с API
// const api = new Api('https://jsonplaceholder.typicode.com');
// // Popup для просмотра изображения
// const popupWithImage = new PopupWithImage('#popup-image');
// popupWithImage.setEventListeners();

// // Callback для открытия изображения
// function handleCardClick(link, name) {
//   popupWithImage.open(link, name);
// }

// // Создание рендера для Section
// const renderer = (item) => {
//   const card = new Card(item.name, item.link, '.template-card', handleCardClick);
//   section.addItem(card.generateCard());
// };

// api.getCards()
//   .then((cards) => {
//     const formattedCards = cards.map((card) => ({
//       name: card.title,
//       link:`https://picsum.photos/600/400?random=${card.id}`,
//     }));
//     section.renderItems(formattedCards);
//   })
//   .catch((err) => console.log(err));
// // Section для работы с карточками
// section = new Section({ renderer: renderer.bind(section) }, '#content');

// new CardForm('#form-card', '#card', 'popup-card', section, handleCardClick, api);

// // Загрузка данных пользователя
// api.getUserInfo()
//   .then((data) => {
//     const nameElement = document.querySelector('.profile__name-text');
//     const aboutElement = document.querySelector('.profile__subtitle');
//     const avatarElement = document.querySelector('.profile__img');

//     nameElement.textContent = data.name;
//     aboutElement.textContent = data.username;
//     avatarElement.src = `https://picsum.photos/600/400?random=`;
//   })
//   .catch((err) => console.log(err));

// // Создание PopupWithForm для редактирования профиля
// const userInfo = new UserInfo({
//   nameSelector: '.profile__name-text',
//   jobSelector: '.profile__subtitle',
// });

// const profilePopup = new PopupWithForm(
//   '#popup-profile',
//   '#form',
//   '.popup__input',
//   (formData) => {
//     userInfo.setUserInfo(formData);
//   }
// );

// document.querySelector('.profile__name-btn').addEventListener('click', () => {
//   profilePopup.open();
// });
// profilePopup.setEventListeners();

// // Создание PopupWithForm для добавления карточек
// const cardPopup = new PopupWithForm(
//   '#popup-card',
//   '#form-card',
//   '.popup__input',
//   (formData) => {
//     const card = new Card(formData.name, formData.link, '.template-card', handleCardClick);
//     section.addItem(card.generateCard());
//   }
// );

// document.querySelector('.profile__btn').addEventListener('click', () => {
//   cardPopup.open();
// });
// cardPopup.setEventListeners();
import './style.css';

import Api from '../js/Api.js';
import logo from '../images/logo.svg';
import profileImg from '../images/profile__img.jpg';
import closeIcon from '../images/close-icon.svg';
import pencilIcon from '../images/Vector-pencil.svg';
import Card from '../js/Card.js';
import CardForm from '../js/CardForm.js';
import PopupWithForm from '../js/PopupWithForm.js';
import PopupWithImage from '../js/PopupWithImage.js';
import Section from '../js/Section.js';
import UserInfo from '../js/UserInfo.js';
import FormValidator from '../js/FormValidator.js';

// Установка иконок
document.querySelector('.profile__name-pencil').src = pencilIcon;
document.querySelector('.header__image').src = logo;
document.querySelector('.profile__img').src = profileImg;
document.querySelectorAll('.close__icon').forEach((btn) => {
  btn.src = closeIcon;
});

// Валидация форм
const formProfile = new FormValidator('#form', '.popup__input', '.popup__submit-button', '.error-message');
const formCard = new FormValidator('#form-card', '.popup__input', '.popup__submit-button-card', '.error-message');
formProfile.enableValidation();
formCard.enableValidation();

// Работа с API
const api = new Api('https://jsonplaceholder.typicode.com');

// Popup для просмотра изображения
const popupWithImage = new PopupWithImage('#popup-image');
popupWithImage.setEventListeners();

// Callback для открытия изображения
function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

// Создание Section для работы с карточками
const renderer = (item) => {
  const card = new Card(item.name, item.link, '.template-card', handleCardClick);
  section.addItem(card.generateCard());
};

// Инициализация Section
let section = new Section({ renderer }, '#content');

// Загрузка карточек с сервера
api.getCards()
  .then((cards) => {
    const formattedCards = cards.map((card) => ({
      name: card.title,
      link: `https://picsum.photos/600/400?random=${card.id}`,
    }));
    section.renderItems(formattedCards);
  })
  .catch((err) => console.log(err));

// Создание CardForm (после инициализации section)
new CardForm('#form-card', '#card', 'popup-card', section, handleCardClick, api);

// Загрузка данных пользователя
api.getUserInfo()
  .then((data) => {
    const nameElement = document.querySelector('.profile__name-text');
    const aboutElement = document.querySelector('.profile__subtitle');
    const avatarElement = document.querySelector('.profile__img');

    nameElement.textContent = data.name;
    aboutElement.textContent = data.username;
    avatarElement.src = `https://picsum.photos/600/400?random=1`;
  })
  .catch((err) => console.log(err));

// Создание PopupWithForm для редактирования профиля
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

// Создание PopupWithForm для добавления карточек
const cardPopup = new PopupWithForm(
  '#popup-card',
  '#form-card',
  '.popup__input',
  (formData) => {
    const card = new Card(formData.name, formData.link, '.template-card', handleCardClick);
    section.addItem(card.generateCard());
  }
);

document.querySelector('.profile__btn').addEventListener('click', () => {
  cardPopup.open();
});
cardPopup.setEventListeners();
