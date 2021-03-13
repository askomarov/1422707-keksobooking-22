import { showAlert } from './util.js';
import { setInputMinPrice, syncSelects, syncCheckTime, makeFormsDisabled, makeMapFormsActive, submitForm, showSuccessPopupMessage, showErrorPopupMessage } from './form.js';
import { loadMap, createPointsOnMap, setPositionMainPin } from './map.js';
import { getData } from './get-send-data.js';
import { turnOnFilterListener } from './filter-map-form.js';

const OFFER_QUANTITY = 10;

const sendURL = 'https://22.javascript.pages.academy/keksobooking';
const getURL = 'https://22.javascript.pages.academy/keksobooking/data';

const btnResetForm = document.querySelector('.ad-form__reset');
const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');


makeFormsDisabled();

const getDataSuccess = (data) => {
  createPointsOnMap(data.slice(0, OFFER_QUANTITY))
  turnOnFilterListener(data)
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
