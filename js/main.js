import { showAlert } from './util.js';
import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled, makeMapFormsActive } from './form/active-disabled-forms.js';
import { loadMap, createPointsOnMap, setPositionMainPin } from './map.js';
import { syncSelects } from './form/select-rooms-capacity.js';
import { submitForm } from './form/submit-form.js';
import { showSuccessPopupMessage } from './form/show-success-message.js';
import { showErrorPopupMessage } from './form/show-error-message.js';
import { getData } from './get-send-data.js';

const sendURL = 'https://22.javascript.pages.academy/keksobooking';
const getURL = 'https://22.javascript.pages.academy/keksobooking/data';

const btnResetForm = document.querySelector('.ad-form__reset');
const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');


makeFormsDisabled();

const getDataSuccess = (data) => {
  createPointsOnMap(data)
  makeMapFormsActive();
};

document.addEventListener('DOMContentLoaded', () => {

  loadMap();

  getData(getURL, getDataSuccess, showAlert);

  setInputMinPrice();
  syncCheckTime();

  roomsSelect.addEventListener('change', () => {
    syncSelects(roomsSelect, capacitySelect);
  });

  submitForm(sendURL, showSuccessPopupMessage, showErrorPopupMessage);

  btnResetForm.addEventListener('click', () => {
    setPositionMainPin()
  });
});
