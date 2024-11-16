export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
     
      this._boundHandleEscClose = this._handleEscClose.bind(this);
      this._boundHandleOverlayClose = this._handleOverlayClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('popup_active');
      document.addEventListener('keydown', this._boundHandleEscClose);
      this._popup.addEventListener('click', this._boundHandleOverlayClose);
    }
  
    close() {
      this._popup.classList.remove('popup_active');
      document.removeEventListener('keydown', this._boundHandleEscClose);
      this._popup.removeEventListener('click', this._boundHandleOverlayClose);
    }
  
    setEventListeners() {
      const closeButton = this._popup.querySelector('.close__icon');
      if (closeButton) {
        closeButton.addEventListener('click', () => this.close());
      }
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    _handleOverlayClose(event) {
      if (event.target === this._popup) {
        this.close();
      }
    }
  }