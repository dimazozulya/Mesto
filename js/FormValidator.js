export default class FormValidator{
    constructor (formSelector, inputSelector, submitButtonSelector, errorClass){
      this._form = document.querySelector(formSelector);
      this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
      this._submitButton = this._form.querySelector(submitButtonSelector);
      this._errorClass = errorClass;
    } 
    _validateProfileField(inputElement, errorElement) {
      if (!inputElement.validity.valid) {
          errorElement.textContent = inputElement.validationMessage;
          errorElement.style.display = 'block';
      } else {
          errorElement.textContent = '';
          errorElement.style.display = 'none';
      }
  }
    _toggleButtonState() {
      console.log("Форма валидна?", this._form.checkValidity()); // Проверка валидности формы
      if (this._form.checkValidity()) {
        this._submitButton.disabled = false;
      } else {
        this._submitButton.disabled = true;
      }
    }
    _setEventListeners() {
      this._inputs.forEach((inputElement) => {
          const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
          console.log(`Ищем элемент ошибки для ${inputElement.id}:`, errorElement); // Для отладки
  
          if (!errorElement) {
              console.error(`Элемент ошибки для ${inputElement.id} не найден.`);
              return; // Предотвращаем ошибку
          }
  
          inputElement.addEventListener('input', () => {
              this._validateProfileField(inputElement, errorElement);
              this._toggleButtonState();
          });
      });
  }
    enableValidation() {
      this._setEventListeners(); // Используем метод _setEventListeners
      this._toggleButtonState(); // Начальная проверка состояния кнопки
    }
    
  }