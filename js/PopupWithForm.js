import Popup from '../js/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, inputSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._form = this._popup.querySelector(formSelector);
      this._inputList = this._form.querySelectorAll(inputSelector);
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
      const formData = this._getInputValues();
      this._submitCallback(formData);
      this.close();
    }
    setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit.bind(this)); // Добавляем обработчик
  }
  
    close() {
      super.close();
      this._form.reset(); 
    }
  }