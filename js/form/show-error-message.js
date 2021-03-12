import { isEscEvent } from '../util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mainContentWrap = document.querySelector('main')

const onEscKeydownCloseError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopupError();
  }
};

const closePopupError = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onEscKeydownCloseError);
};

const onBtnCloseError = (evt) => {
  closePopupError();
  evt.target.removeEventListener('click', onBtnCloseError);
};

const showErrorPopupMessage = () => {
  const messageElement = errorMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  const closeErrPopupBtn = document.querySelector('.error__button');
  closeErrPopupBtn.addEventListener('click', onBtnCloseError);
  document.addEventListener('keydown', onEscKeydownCloseError);
};

export { showErrorPopupMessage };

