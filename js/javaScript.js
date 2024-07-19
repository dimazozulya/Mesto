
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

