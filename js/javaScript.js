
const modal = document.getElementById('popup-profile');
const closeButton = document.querySelector('.popup__close-btn');
const openButton = document.querySelector('.profile__name-btn');

function openModal() {
  modal.classList.add('popup_active');
};
function closeModal() {
  modal.classList.remove('popup_active');
};
closeButton.addEventListener('click', closeModal);
openButton.addEventListener('click', openModal);


window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});


const modalCard = document.getElementById('popup-card');
const closeButtonCard = document.querySelector('.popup__close-btn-card');
const openButtonCard = document.querySelector('.profile__btn');

function openModalCard() {
  modalCard.classList.add('popup_active');
};
function closeModalCard() {
  modalCard.classList.remove('popup_active');
};
closeButtonCard.addEventListener('click', closeModalCard);
openButtonCard.addEventListener('click', openModalCard);

window.addEventListener('click', function(event) {
  if (event.target === modalCard) {
    closeModalCard();
  }
});
const formElement = document.querySelector('#form');

const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const nameDisplay = document.querySelector('.profile__name-text');
    const jobDisplay = document.querySelector('.profile__subtitle');

    nameDisplay.textContent = nameValue;
    jobDisplay.textContent = jobValue;
};

const saveButton = document.querySelector('.popup__submit-button');

formElement.addEventListener('submit', handleFormSubmit);
saveButton.addEventListener('click', closeModal);

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


const template = document.getElementById('card');
const content = document.getElementById('content');

function renderCards(cards) {


  content.innerHTML = ''; 
  

  cards.forEach((item, index) => {
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.element__title').textContent = item.name;
    clone.querySelector('.element__image_style').src = item.link;
    
    const likeButton = clone.querySelector('.element__like-svg');
    likeButton.addEventListener('click', (e) => {
      console.log('Button clicked');
      e.currentTarget.classList.toggle('element__like-svg-active');
    });

    const deleteButton = clone.querySelector('.element__card_remove');
    deleteButton.addEventListener('click', () => {
      console.log('Delete button clicked');
      initialCards.splice(index, 1); 
      renderCards(initialCards); 
    });

    content.appendChild(clone);
  });
}
renderCards(initialCards);


const formElementCard = document.querySelector('#form-card');
const nameInputCard = document.querySelector('.popup__input-name-card');
const placeInputCard = document.querySelector('.popup__input-place-card');
const saveButtonCard = document.querySelector('.popup__submit-button-card');


function addFormSubmit(evt) {
  evt.preventDefault(); 

  const cardNameValue = nameInputCard.value;
  const cardPlaceValue = placeInputCard.value;
  initialCards.unshift({ name: cardNameValue, link: cardPlaceValue });
  renderCards(initialCards);
  formElementCard.reset();
};
renderCards(initialCards);

formElementCard.addEventListener('submit', addFormSubmit);
saveButtonCard.addEventListener('click', closeModalCard);



