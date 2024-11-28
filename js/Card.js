export default class Card {
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
  
    // generateCard() {
    //   this._element = this._getTemplate();
    //   this._likeButton = this._element.querySelector('.element__like-svg');
    //   this._deleteButton = this._element.querySelector('.element__card_remove');
    //   this._cardImage = this._element.querySelector('.element__image_style');
    //   this._element.querySelector('.element__title_card').textContent = this._name;
    //   this._cardImage.src = this._link;
    //   this._cardImage.alt = this._name;

    //   if (this._handleCardClick){
    //     this._cardImage.addEventListener('click', () => {
    //         this._handleCardClick(this._link, this._name);
    //       });
    //   } else {
    //     console.log('_handleCardClick не найден')
    //   }
  
    //   this._likeButton.addEventListener('click', () => this._toggleLikeButton());
    //   this._deleteButton.addEventListener('click', () => this._removeCard());
  
    //   return this._element;
    // }
    generateCard() {
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.element__like-svg');
      this._deleteButton = this._element.querySelector('.element__card_remove');
      this._cardImage = this._element.querySelector('.element__image_style');
      this._element.querySelector('.element__title_card').textContent = this._name || 'Без названия'; // Подставляем текст
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
    
      if (this._handleCardClick) {
        this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._link, this._name);
        });
      }
    
      this._likeButton.addEventListener('click', () => this._toggleLikeButton());
      this._deleteButton.addEventListener('click', () => this._removeCard());
    
      return this._element;
    }
    
  }


