import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled } from './form/active-disabled-forms.js';
import { initMap } from './map.js';
import { syncSelects } from './form/select-rooms-capacity.js';

makeFormsDisabled();

const roomsSelect = document.querySelector('#room_number')
const capacitySelect = document.querySelector('#capacity');

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setInputMinPrice();
  syncCheckTime();
  syncSelects(roomsSelect, capacitySelect)
});



