import { showAlert } from './util.js';
import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled } from './form/active-disabled-forms.js';
import { loadMap, initMap, createPointsOnMap, setPositionMainPin } from './map.js';
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


const initMapWhitServerData = (getURL, onSuccess) => {
  // может сюда вторым паарметром сразу передевать createPointsOnMap, а сверху этот параметр убрать??
  getData(getURL, onSuccess)
    .then(loadMap())
    .then(initMap())
    .catch((err) => {
      showAlert('Ошибка..:' + err);
    });
};

makeFormsDisabled();

document.addEventListener('DOMContentLoaded', () => {
  initMapWhitServerData(getURL, createPointsOnMap);

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
