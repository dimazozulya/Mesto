
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



let formElement = document.querySelector('#form');

let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    let nameDisplay = document.querySelector('.profile__name-text');
    let jobDisplay = document.querySelector('.profile__subtitle');

    nameDisplay.textContent = nameValue;
    jobDisplay.textContent = jobValue;
};

    let saveButton = document.querySelector('.popup__submit-button');

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

initialCards.forEach(item =>{
  const clone = template.content.cloneNode(true);
  
  clone.querySelector('.element__title').textContent = item.name;
  clone.querySelector('.element__image_style').src = item.link;
  
  const likeButton = clone.querySelector('.element__like-svg');
  likeButton.addEventListener('click', (e) => {
    console.log('Button clicked');
    e.currentTarget.classList.toggle('element__like-svg-active');
  });

  content.appendChild(clone);                     
});






let formElementCard = document.querySelector('#form-card');

let nameInputCard = document.querySelector('.popup__input-name-card');
let placeInputCard = document.querySelector('.popup__input-place-card');

function addFormSubmit(evt) {
    evt.preventDefault(); 

    let cardNameValue = nameInputCard.value;
    let cardPlaceValue = placeInputCard.value;

    const clone = template.content.cloneNode(true);

    let cardNameDisplay = clone.querySelector('.element__title');
    let cardPlaceDisplay = clone.querySelector('.element__image_style');

    cardNameDisplay.textContent = cardNameValue;
    cardPlaceDisplay.src = cardPlaceValue;

    content.appendChild(clone);
};

    let saveButtonCard = document.querySelector('.popup__submit-button-card');

formElementCard.addEventListener('submit', addFormSubmit);
saveButtonCard.addEventListener('click', closeModalCard);

