import { showAlert } from './util.js';
import { setInputMinPrice, roomsSelectListener, syncCheckTime, makeFormsDisabled, makeMapFormsActive, submitForm, showSuccessPopupMessage, showErrorPopupMessage, onBtnResetAddFormListener } from './form.js';
import { loadMap, createPointsOnMap } from './map.js';
import { getData } from './get-send-data.js';
import { turnOnFilterListener } from './filter-map-form.js';
import { previewAvatar, previewBackground } from './preview-avatar-background.js';

const OFFER_QUANTITY = 10;

const sendURL = 'https://22.javascript.pages.academy/keksobooking';
const getURL = 'https://22.javascript.pages.academy/keksobooking/data';



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
  roomsSelectListener();

  submitForm(sendURL, showSuccessPopupMessage, showErrorPopupMessage);

  onBtnResetAddFormListener();

  previewAvatar();
  previewBackground()
});
