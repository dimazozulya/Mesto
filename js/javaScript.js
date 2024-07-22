
let modal = document.getElementById('popup');
let closeButton = document.querySelector('.popup__close-btn');
let openButton = document.querySelector('.profile__name-btn');

function openModal() {
  modal.classList.add('popup_active');
}
function closeModal() {
  modal.classList.remove('popup_active');
}
closeButton.addEventListener('click', closeModal);
openButton.addEventListener('click', openModal);

window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
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
}

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

  content.appendChild(clone);
                          
})

