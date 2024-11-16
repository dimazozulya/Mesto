
export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _toggleLikeButton() {
    this._likeButton.classList.toggle('element__like-svg-active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }
  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector('.element__card').cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-svg');
    this._deleteButton = this._element.querySelector('.element__card_remove');
    this._cardImage = this._element.querySelector('.element__image_style');
    this._element.querySelector('.element__title_card').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._likeButton.addEventListener('click', () => this._toggleLikeButton());
    this._deleteButton.addEventListener('click', () => this._removeCard());

    return this._element;
  }
}

export class CardForm {
  constructor(formSelector, templateSelector, popupId, section) {
    this._form = document.querySelector(formSelector);
    this._templateSelector = templateSelector;
    this._popup = document.getElementById(popupId);
    this._section = section; 
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
  
    const newCard = new Card(nameInput, linkInput, this._templateSelector);
    const cardElement = newCard.generateCard();
  
    this._section.addItem(cardElement); 
  
    this._form.reset();
    this._closePopup();
  }
  
  }
