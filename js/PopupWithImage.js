import Popup from '../js/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.element__image_popup');
      this._popupCaption = this._popup.querySelector('.element__title_popup');
    }
  
    open(link, name) {
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupCaption.textContent = name;
      super.open();
    }
    close(){
      super.close();
    }
  }