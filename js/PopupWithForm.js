import Popup from '../js/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, inputSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._form = this._popup.querySelector(formSelector);
      this._inputList = this._form.querySelectorAll(inputSelector);
      this._submitButton = this._form.querySelector('.popup__submit-button');
    }
  
    _getInputValues() {
      const values = {};
      this._inputList.forEach((input) => {
        values[input.name] = input.value; 
      });
      return values;
    }
  
    _handleSubmit(event) {
      event.preventDefault();
    
     
      this._initialButtonText = this._submitButton.textContent; 
      this._submitButton.textContent = 'Сохранение...';
    
      const formData = this._getInputValues();
    
      this._submitCallback(formData) 
        .then(() => this.close()) 
        .catch((err) => {
          console.error('Ошибка при обновлении данных:', err);
          alert('Не удалось обновить данные. Попробуйте ещё раз.'); 
        })
        .finally(() => {
          
          this._submitButton.textContent = this._initialButtonText;
        });
    }
    setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit.bind(this)); 
  }
  
    close() {
      super.close();
      this._form.reset(); 
    }
  }