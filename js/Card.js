export default class Card {
    constructor(name, link, likes, id, ownerId, cardId, templateSelector, handleCardClick, api, currentUserId){
      this._name = name || 'Без названия';
      this._link = link || ''; 
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._api = api;
      this._likes = likes || [];
      this._cardId = cardId; 
      this._id = id;
      this._ownerId = ownerId; 
      this._currentUserId = currentUserId;
    }
    _getTemplate() {
      const template = document.querySelector(this._templateSelector);
      if (!template) {
        throw new Error(`Шаблон не найден. Проверьте селектор: "${this._templateSelector}"`);
      }
      return template.content.querySelector('.element__card').cloneNode(true);
    }
    _toggleLikeButton() {
      const isLiked = this._likeButton.classList.contains('element__like-svg-active');
    
      this._api.toggleLike(this._cardId, isLiked)
        .then((updatedCard) => {
          this._likeButton.classList.toggle('element__like-svg-active');
          this._likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.error('Ошибка при обновлении лайка:', err));
    }    
  
    _removeCard() {
      this._api.deleteCard(this._cardId)
      .then(() => {
        console.log('Удалена карточка под номером:', this._cardId);
        this._element.remove();
        this._element = null;
      })
      .catch((err) => console.error('Ошибка при удаление карточки :', err));
    }
    _canDeleteCard() {
      return this._ownerId === this._currentUserId;
    }
    generateCard() {
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.element__like-svg');
      this._deleteButton = this._element.querySelector('.element__card_remove');
      this._cardImage = this._element.querySelector('.element__image_style');
      this._likeCount = this._element.querySelector('.element__like-count')
      this._element.querySelector('.element__title_card').textContent = this._name || 'Без названия'; // Подставляем текст
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;

      this._likeCount.textContent = this._likes ? this._likes.length : 0; 
      
      if (this._isLIkedByUser()){
        this._likeButton.classList.add('element__like-svg-active');
      }

      if (this._handleCardClick) {
        this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._link, this._name);
        });
      }
      if (this._canDeleteCard()){
        this._deleteButton.classList.add('element__delete-button_visible');
        this._deleteButton.addEventListener('click', () => this._removeCard());
      } else {
        this._deleteButton.remove();
      }
    
      this._likeButton.addEventListener('click', () => this._toggleLikeButton());
      if (this._deleteButton) {
      
      }
      return this._element;
    }
    _isLIkedByUser(){
      return this._likes && this._likes.some((like) => like._id === this._currentUserId);
    }
    
  }


