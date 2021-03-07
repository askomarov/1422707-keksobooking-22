import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled } from './form/active-disabled-forms.js';
import { initMapWhitServerData, setPositionMainPin } from './map.js';
import { syncSelects } from './form/select-rooms-capacity.js';
import { submitForm } from './form/submit-form.js'

const btnResetForm = document.querySelector('.ad-form__reset');

const roomsSelect = document.querySelector('#room_number');
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

  submitForm();

  btnResetForm.addEventListener('click', () => {
    setPositionMainPin()
  })
}


mainFunctions();
