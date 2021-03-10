import { sendData } from '../get-send-data.js';

const adForm = document.querySelector('.ad-form');

const submitForm = (sendURL, onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(sendURL, new FormData(evt.target), onSuccess, onFail)
  });
};

export { submitForm };
