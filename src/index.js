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

document.querySelector('.profile__name-pencil').src = pencilIcon;
document.querySelector('.header__image').src = logo;
document.querySelector('.profile__img').src = profileImg;
document.querySelectorAll('.close__icon').forEach((btn) => {
  btn.src = closeIcon;
});

const formProfile = new FormValidator('#form', '.popup__input', '.popup__submit-button', '.error-message');
const formCard = new FormValidator('#form-card', '.popup__input', '.popup__submit-button-card', '.error-message');
formProfile.enableValidation();
formCard.enableValidation();

const api = new Api('https://jsonplaceholder.typicode.com');

const popupWithImage = new PopupWithImage('#popup-image');
popupWithImage.setEventListeners();

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

let section = new Section({ renderer }, '#content');

api.getCards()
  .then((cards) => {
    console.log('Исходные данные карточек:', cards);

    const formattedCards = cards.map((card) => {
      console.log('card.userId:', card.userId); 
      return {
        name: card.title || 'Без названия',
        link: `https://picsum.photos/600/400?random=${card.id}`,
        likes: card.likes || [],
        id: card.id,
        ownerId: card.userId || null, 
      };
    });
    console.log('Сформированные данные карточек:', formattedCards);
    section.renderItems(formattedCards);
  })
  .catch((err) => console.error('Ошибка загрузки карточек:', err));
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

const userInfo = new UserInfo({
  nameSelector: '.profile__name-text',
  jobSelector: '.profile__subtitle',
});

api.getUserInfo()
  .then((data) => {
    console.log('Данные пользователя с сервера:', data);

    userInfo.setUserInfo({
      name: data.name,
      job: data.username, 
    });
  })
  .catch((err) => console.error('Ошибка при загрузке пользователя:', err));

const profilePopup = new PopupWithForm(
  '#popup-profile',
  '#form',
  '.popup__input',
  (formData) => {
    console.log('Данные для обновления профиля:', formData);

    return api.updateUserInfo({
      name: formData.name,
      username: formData.job, 
    })
    .then((updatedData) => {
      console.log('Обновлённые данные пользователя:', updatedData);
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

  document.querySelector('.popup__input-name').value = currentUserInfo.name;
  document.querySelector('.popup__input-job').value = currentUserInfo.job;

  profilePopup.open();
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(
  '#popup-card',
  '#form-card',
  '.popup__input',
  (formData) => {
    console.log('Данные из формы: ', formData);

    return api.addCard({ name: formData.name, link: formData.link })
      .then((newCard) => {
        console.log('Ответ сервера: ', newCard);

        
        const card = new Card(
          newCard.title,       
          formData.link,       
          [],                  
          newCard.id,         
          currentUserId,      
          newCard.id,      
          '#card',         
          handleCardClick,    
          api,                 
          currentUserId   
        );

        section.addItem(card.generateCard()); 
        console.log('Карточка создана и добавлена: ', card);
      });
  }
);
const formAvatar = new FormValidator ('#form-avatar', '.popup__input', '.popup__submit-button', '.error-message');
formAvatar.enableValidation();

const avatarPopup = new PopupWithForm(
  '#popup-avatar',
  '#form-avatar',
  '.popup__input',
  (formData) => {
    console.log('Ссылка на аватар: ', formData.avatar);

     return api.updateAvatar(formData)
        .then((updatedData) => {
          console.log('Обновленный аватар: ', updatedData);
          document.querySelector('.profile__img').src = updatedData.avatar;
          avatarPopup.close();
        })
        .catch((err) =>{
          console.error('Ошибка при обновлении аватара:', err);
          alert('Не удалось обновить аватар. Попробуйте еще раз');
        });
  }
)
document.querySelector('.image-container__overlay').addEventListener('click', () => {
  avatarPopup.open();
});
avatarPopup.setEventListeners();

document.querySelector('.profile__btn').addEventListener('click', () => {
  cardPopup.open();
});
cardPopup.setEventListeners();


