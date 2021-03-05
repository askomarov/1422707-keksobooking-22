import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled } from './form/active-disabled-forms.js';
import { initMapWhitServerData } from './map.js';
import { syncSelects } from './form/select-rooms-capacity.js';
import { showSuccessPopupMessage } from './form/show-success-message.js'
import { showErrorPopupMessage } from './form/show-error-message.js'
import { submitForm } from './form/submit-form.js';


const adForm = document.querySelector('.ad-form');
const sendURL = 'https://22.javascript.pages.academy/keksobooking';



const roomsSelect = document.querySelector('#room_number')
const capacitySelect = document.querySelector('#capacity');

makeFormsDisabled();

const mainFunctions = () => {
  document.addEventListener('DOMContentLoaded', () => {
    initMapWhitServerData();

    setInputMinPrice();
    syncCheckTime();

    roomsSelect.addEventListener('change', () => {
      syncSelects(roomsSelect, capacitySelect);
    })

  });

  submitForm(adForm, sendURL, showSuccessPopupMessage, showErrorPopupMessage);

}


mainFunctions();
