class Card {
    constructor(name, link, templateSelector){
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
      const template = document.querySelector(this._templateSelector);

      if (!template) {
          throw new Error(`Шаблон с селектором ${this._templateSelector} не найден`);
      }

      const cardElement = template.content
          .querySelector('.element__card')
          .cloneNode(true);

      return cardElement;
  }

   _toggleLikeButton() {
        this._likeButton.classList.toggle('element__like-svg-active');
    }

    _removeCard() {
      this._element.remove();
      this._element = null;
}

  _handleEscClose(event){
    if (event.key === 'Escape'){
      this._closePopup();
    }
}
  _handleWindowClose(event){
    const popup = document.getElementById('popup-image');
    if (event.target === popup || event.target === document.getElementById('popup-image-pic')) {
        this._closePopup();
    }
}
  _openImagePopup() {
    const popup = document.getElementById('popup-image');
    const popupImage = popup.querySelector('.element__image_popup');
    const popupTitle = popup.querySelector('.element__title_popup');
    
    popupImage.src = this._link; 
    popupImage.alt = this._name; 
    popupTitle.textContent = this._name; 

    popup.classList.add('popup_active'); 
    window.addEventListener('keydown', this._handleEscClose.bind(this));
    window.addEventListener('click', this._handleWindowClose.bind(this));
  }
  _closePopup() {
    const popup = document.getElementById('popup-image');
    popup.classList.remove('popup_active');
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
    window.removeEventListener('click', this._handleWindowClose.bind(this));
    
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-svg');
    this._deleteButton = this._element.querySelector('.element__card_remove');
    this._closeButton = this._element.querySelector('.popup__element-close');
    this._cardImage = this._element.querySelector('.element__image_style');
    this._element.querySelector('.element__title_card').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._likeButton.addEventListener('click', () => {
      this._toggleLikeButton();
  });

    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
  });

    this._cardImage.addEventListener('click', () => {
      this._openImagePopup();
    });
    
    this._closeButton.addEventListener('click', () => {
      this._closePopup();
    });
   

    return this._element;
  }
}

class CardForm {
  constructor(formSelector, containerSelector, templateSelector, popupId) {
    this._form = document.querySelector(formSelector);
    this._container = document.querySelector(containerSelector);
    this._templateSelector = templateSelector;
    this._popup = document.getElementById(popupId);
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

    this._container.prepend(newCard.generateCard());
    
    this._form.reset();
    this._closePopup();
  }
}

export { Card, CardForm };