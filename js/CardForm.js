export default class CardForm {
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