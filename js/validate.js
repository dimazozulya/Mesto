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