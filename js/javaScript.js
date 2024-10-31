
const modal = document.getElementById('popup-profile');
const closeButton = document.querySelector('.popup__close-btn');
const openButton = document.querySelector('.profile__name-btn');

function openModal() {
  modal.classList.add('popup_active');
  window.addEventListener('keydown', handleEscClose); 
}

function closeModal() {
  modal.classList.remove('popup_active');
  window.removeEventListener('keydown', handleEscClose); 
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

closeButton.addEventListener('click', closeModal);
openButton.addEventListener('click', openModal);


window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  };
});



const formProfile = document.getElementById('form'); 
const nameInputProfile = document.querySelector('.popup__input-name'); 
const jobInputProfile = document.querySelector('.popup__input-job'); 


const nameErrorProfile = document.getElementById('name-error'); 
const jobErrorProfile = document.getElementById('job-error'); 


const saveButtonProfile = document.querySelector('.popup__submit-button'); 



const formValidCard = document.getElementById('form-card');
const nameInputValidCard = document.querySelector('.popup__input-name-card');
const linkInputValidCard = document.querySelector('.popup__input-place-card');

const nameErrorCard = document.getElementById('name-error-card');
const linkErrorCard = document.getElementById('link-error-card');

const saveButtonValidCard = document.querySelector('.popup__submit-button-card');


function validateProfileField (input, errorElement) {
  if (!input.validity.valid){
    errorElement.textContent = input.validationMessage;
    errorElement.style.display = 'block';
  } else {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}
  function toggleSubmitButtonProfile(){
    if (formProfile.checkValidity()){
      saveButtonProfile.disabled = false;
    } else {
      saveButtonProfile.disabled = true; 
    }
  }

  function toggleSubmitButtonCard(){
    if (formValidCard.checkValidity()){
      saveButtonValidCard.disabled = false;
    } else {
      saveButtonValidCard.disabled = true;
    }
  }

nameInputProfile.addEventListener('input', () =>{
  validateProfileField(nameInputProfile, nameErrorProfile);
  toggleSubmitButtonProfile();
});

jobInputProfile.addEventListener('input', () => {
  validateProfileField(jobInputProfile, jobErrorProfile);
  toggleSubmitButtonProfile();
});

formProfile.addEventListener('submit', (evt) =>{
  evt.preventDefault();

  if (formProfile.checkValidity()){
    handleFormSubmit(evt);
  }
});


nameInputValidCard.addEventListener('input', () =>{
  validateProfileField (nameInputValidCard, nameErrorCard);
  toggleSubmitButtonCard(); 
}); 

linkInputValidCard.addEventListener('input', () => {
  validateProfileField (linkInputValidCard, linkErrorCard);
  toggleSubmitButtonCard()
});

formValidCard.addEventListener('submit', (evt) => {
   evt.preventDefault(); 

   if (formValidCard.checkValidity()){
    handleFormSubmit(evt);
   }
});




const modalCard = document.getElementById('popup-card');
const closeButtonCard = document.querySelector('.popup__close-btn-card');
const openButtonCard = document.querySelector('.profile__btn');

function openModalCard() {
  modalCard.classList.add('popup_active');
  window.addEventListener ('keydown', handleEscCloseCard);
};
function closeModalCard() {
  modalCard.classList.remove('popup_active');
  window.removeEventListener ('keydown', handleEscCloseCard);
};

function handleEscCloseCard(event){
  if (event.key === 'Escape'){
    closeModalCard();
  }
}
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

function createCard(item, index) {
  const clone = template.content.cloneNode(true);
  const cardTitle = clone.querySelector('.element__title');
  const cardImage = clone.querySelector('.element__image_style');
  const popupImage = clone.querySelector('.element__image_popup');
  const popupTitle = clone.querySelector('.element__title_popup');
  const popupElement = clone.querySelector('.popup__element');
  const closeButton = clone.querySelector('.popup__element-close');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;

  popupTitle.textContent = item.name;
  popupImage.src = item.link;
  

  function handleEscCloseImg(event) {
    if (event.key === 'Escape') {
      popupElement.classList.remove('popup_active');
    }
  }
  cardImage.addEventListener('click', () => {
      popupElement.classList.add('popup_active');
      window.addEventListener('keydown', handleEscCloseImg); 
  });

  closeButton.addEventListener('click', () => {
      popupElement.classList.remove('popup_active');
      window.removeEventListener('keydown', handleEscCloseImg); 
  });
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
   
  return clone;
}
function renderCards() {
  content.textContent = ''; 
  const cards = initialCards.map((item, index) => createCard(item, index)); 
  content.append(...cards); 
}

renderCards(initialCards);

  
// function renderCards(cards) {
//   content.innerHTML = ''; 
//   cards.forEach((item, index) => {
//     const clone = template.content.cloneNode(true);
//     const cardTitle = clone.querySelector('.element__title');
//     const cardImageBtn = clone.querySelector('.element__image');
//     const cardImage = clone.querySelector('.element__image_style');
//     const popupImage = clone.querySelector('.element__image_popup');
//     const popupTitle = clone.querySelector('.element__title_popup');
//     const popupElement = clone.querySelector('.popup__element');
//     const closeButton = clone.querySelector('.popup__element-close');


//     cardTitle.textContent = item.name;
//     cardImage.src = item.link;

//     popupTitle.textContent = item.name;
//     popupImage.src = item.link;

//     cardImageBtn.addEventListener('click', () => {
//       popupElement.classList.add('popup_active');
//       window.addEventListener('keydown', handleEscCloseImg); 
//     });

//     closeButton.addEventListener('click', () => {
//       popupElement.classList.remove('popup_active');
//       window.removeEventListener('keydown', handleEscCloseImg); 
//     });



    

    
//    
//   });
// }

const formElementCard = document.querySelector('#form-card');
const nameInputCard = document.querySelector('.popup__input-name-card');
const placeInputCard = document.querySelector('.popup__input-place-card');
const saveButtonCard = document.querySelector('.popup__submit-button-card');


function addFormSubmit(evt) {
  evt.preventDefault(); 

  const cardNameValue = nameInputCard.value;
  const cardPlaceValue = placeInputCard.value;
  initialCards.push({name: cardNameValue, link: cardPlaceValue});
  renderCards(initialCards);
  formElementCard.reset();
};
renderCards(initialCards);

formElementCard.addEventListener('submit', addFormSubmit);
saveButtonCard.addEventListener('click', closeModalCard);