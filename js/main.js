import { showAlert } from './util.js';
import { setInputMinPrice, roomsSelectListener, syncCheckTime, makeFormsDisabled, makeMapFormsActive, submitForm, showSuccessPopupMessage, showErrorPopupMessage, onBtnResetAddFormListener } from './form.js';
import { loadMap, createPointsOnMap } from './map.js';
import { getData } from './get-send-data.js';
import { filterMapForm } from './filter-map-form.js';
import { previewAvatar, previewBackground } from './preview-avatar-background.js';

const sendURL = 'https://22.javascript.pages.academy/keksobooking';
const getURL = 'https://22.javascript.pages.academy/keksobooking/data';

makeFormsDisabled();

const getDataSuccess = (data) => {
  createPointsOnMap(data)
  filterMapForm(data)
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
