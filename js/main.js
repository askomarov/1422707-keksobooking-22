import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled } from './form/active-disabled-forms.js';
import { initMapWhitServerData } from './map.js';
import { syncSelects } from './form/select-rooms-capacity.js';
import { showSuccessMessage } from './form/show-success-message.js'
import { submitForm } from './form/submit-form.js';


const adForm = document.querySelector('.ad-form');
const sendURL = 'https://22.javascript.pages.academy/keksobooking';

const succeessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const mainContentWrap = document.querySelector('main')


const roomsSelect = document.querySelector('#room_number')
const capacitySelect = document.querySelector('#capacity');

makeFormsDisabled();

const mainFunctions = () => {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('html загружен, DOM готов')

    initMapWhitServerData();

    setInputMinPrice();
    syncCheckTime();

    roomsSelect.addEventListener('change', () => {
      syncSelects(roomsSelect, capacitySelect);
    })

  });
}
mainFunctions();
submitForm(adForm, sendURL, showSuccessMessage(succeessMessageTemplate, mainContentWrap));
