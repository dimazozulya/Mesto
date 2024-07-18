// почему ты все переменные объявляешь через let, если они все у тебя неизменяемые?
// по дефолту всегда надо объявлять через const
let modal = document.getElementById('popup');
let closeButton = document.querySelector('.closeBtn');
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
//Можно выебнуться и так написать, но у тебя более читаемое, так что оставь своё решение, моё ты все равно скорее всего не понял ;) --- window.addEventListener('click', (e) => e.target === modal ? closeModal() : null);



let formElement = document.querySelector('#inputs');

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

