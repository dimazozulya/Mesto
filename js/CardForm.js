import Card from "./Card";

export default class CardForm {
  constructor(formSelector, templateSelector, popupId, section, handleCardClick, api) {
    this._form = document.querySelector(formSelector);
    this._templateSelector = templateSelector;
    this._popup = document.getElementById(popupId);
    this._section = section; 
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._setEventListeners();
  }
  
  _setEventListeners() {
    this._form.addEventListener('submit', this._handleFormSubmit.bind(this));
  }
  
  _closePopup(){
    this._popup.classList.remove('popup_active');
  }
  
  _handleFormSubmit(event) {
    event.preventDefault();
    
    const nameInput = this._form.querySelector('.popup__input-name-card').value;
    const linkInput = this._form.querySelector('.popup__input-place-card').value;
    console.log('Данные из формы:', { nameInput, linkInput });
    this._api.addCard({ name: nameInput, link: linkInput })
    .then((newCard) => {
      console.log('Ответ сервера:', newCard);
      const card = new Card(newCard.title, linkInput, this._templateSelector, this._handleCardClick);
      const cardElement = card.generateCard();
      console.log('Section:', this._section);
      this._section.addItem(cardElement);
      this._form.reset();
      this._closePopup();
    })
    .catch((err) => console.log('Ошибка при добавлении карточки:', err));
  }
}