import { setInputMinPrice } from './form/input-price.js';
import { syncCheckTime } from './form/check-time.js';
import { makeFormsDisabled } from './form/active-disabled-forms.js';
import { initMap } from './map.js';

makeFormsDisabled();

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setInputMinPrice();
  syncCheckTime();
})
