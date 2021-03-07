import { sendData } from '../get-send-data.js';
import { setPositionMainPin } from '../map.js';
import { showSuccessPopupMessage } from './show-success-message.js'
import { showErrorPopupMessage } from './show-error-message.js'

const adForm = document.querySelector('.ad-form');
const sendURL = 'https://22.javascript.pages.academy/keksobooking';

const submitForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(sendURL, formData)
      .then(showSuccessPopupMessage())
      .then(adForm.reset())
      .then(setPositionMainPin())
      .catch(showErrorPopupMessage())
  });
};
export { submitForm };
