import { isEscEvent } from '../util.js';
import { setPositionMainPin } from '../map.js';

const adForm = document.querySelector('.ad-form');

const mainContentWrap = document.querySelector('main')
const succeessMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const closeSuccessPopup = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onEscKeydownCloseSuccess);
  document.removeEventListener('click', onClickCloseSuccess);
};

const onClickCloseSuccess = () => {
  closeSuccessPopup();
};

const onEscKeydownCloseSuccess = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const showSuccessPopupMessage = () => {
  const messageElement = succeessMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  document.addEventListener('keydown', onEscKeydownCloseSuccess);
  document.addEventListener('click', onClickCloseSuccess);
  adForm.reset();
  setPositionMainPin();
};

export { showSuccessPopupMessage };
