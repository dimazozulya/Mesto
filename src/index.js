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

const currentUserId = 1;
console.log('ID текущего пользователя:', currentUserId);

const renderer = (item) => {
  console.log('Рендер карточки:', item);
  const card = new Card(
    item.name,
    item.link,
    item.likes,
    item.id,
    item.ownerId,
    item.cardId,
    '#card',
    handleCardClick,
    api,
    currentUserId
  );
  section.addItem(card.generateCard());
  console.log('Рендер карточки:', item);
};

// Инициализация Section
let section = new Section({ renderer }, '#content');

// Загрузка карточек с сервера
api.getCards()
  .then((cards) => {
    // Логируем все карточки, чтобы посмотреть, есть ли userId
    console.log('Исходные данные карточек:', cards);

    const formattedCards = cards.map((card) => {
      console.log('card.userId:', card.userId); // Логируем userId каждой карточки
      return {
        name: card.title || 'Без названия',
        link: `https://picsum.photos/600/400?random=${card.id}`,
        likes: card.likes || [],
        id: card.id,
        ownerId: card.userId || null, // Проверяем, что card.userId существует
      };
    });
    console.log('Сформированные данные карточек:', formattedCards);
    section.renderItems(formattedCards);
  })
  .catch((err) => console.error('Ошибка загрузки карточек:', err));

  // document.addEventListener('DOMContentLoaded', () => {
  //   new CardForm('#form-card', '#card', 'popup-card', section, handleCardClick, api);
  // });
// Загрузка данных пользователя
api.getUserInfo()
  .then((data) => {
    const nameElement = document.querySelector('.profile__name-text');
    const aboutElement = document.querySelector('.profile__subtitle');
    const avatarElement = document.querySelector('.profile__img');
    
    currentUserId = data.id; 
    console.log ('Текущий пользователь : ', currentUserId);

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

api.getUserInfo()
  .then((data) => {
    console.log('Данные пользователя с сервера:', data);

    // Обновляем DOM
    userInfo.setUserInfo({
      name: data.name,
      job: data.username, // JSONPlaceholder использует "username"
    });
  })
  .catch((err) => console.error('Ошибка при загрузке пользователя:', err));

// Popup для редактирования профиля
const profilePopup = new PopupWithForm(
  '#popup-profile',
  '#form',
  '.popup__input',
  (formData) => {
    console.log('Данные для обновления профиля:', formData);

    api.updateUserInfo({
      name: formData.name,
      username: formData.job, // JSONPlaceholder использует "username"
    })
    .then((updatedData) => {
      console.log('Обновлённые данные пользователя:', updatedData);

      // Обновляем интерфейс
      userInfo.setUserInfo({
        name: updatedData.name,
        job: updatedData.username,
      });

      profilePopup.close();
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
      alert('Не удалось обновить данные. Попробуйте ещё раз.');
    });
  }
);

document.querySelector('.profile__name-btn').addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  console.log('Текущие данные профиля:', currentUserInfo);

  // Заполняем форму текущими данными
  document.querySelector('.popup__input-name').value = currentUserInfo.name;
  document.querySelector('.popup__input-job').value = currentUserInfo.job;

  profilePopup.open();
});
profilePopup.setEventListeners();
// Создание PopupWithForm для добавления карточек
const cardPopup = new PopupWithForm(
  '#popup-card',
  '#form-card',
  '.popup__input',
  (formData) => {
    console.log('Данные из формы: ', formData);
    const card = new Card(
      formData.name,       // Имя карточки
      formData.link,       // Ссылка на изображение
      [],                  // Лайки, если пока нет
      null,                // ID карточки
      currentUserId,       // ID владельца карточки (например, текущего пользователя)
      null,                // ID для сервера, если есть
      '#card',             // Селектор шаблона карточки
      handleCardClick,     // Обработчик клика на изображение
      api,                 // Объект API для взаимодействия с сервером
      currentUserId        // ID текущего пользователя для проверки прав
    );

    section.addItem(card.generateCard());
    console.log('Карточка создана: ', card); 
  }
);

document.querySelector('.profile__btn').addEventListener('click', () => {
  cardPopup.open();
});
cardPopup.setEventListeners();
