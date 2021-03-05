import { isEscEvent } from '../util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mainContentWrap = document.querySelector('main')

const removeBtnCloseListner = (btn) => {
  btn.removeEventListener('click', onBtnCloseError)
}

const closePopupError = () => {
  const errorElementMessage = document.querySelector('.error')
  errorElementMessage.remove();
  document.removeEventListener('keydown', onEscKeydownCloseError);
};

const onEscKeydownCloseError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopupError();
  }
};
const onBtnCloseError = (evt) => {
  closePopupError();
  evt.target.removeEventListener('click', onBtnCloseError);
};

const showErrorPopupMessage = async () => {
  const messageElement = errorMessageTemplate.cloneNode(true);
  await mainContentWrap.append(messageElement);
  const closeErrPopupBtn = await document.querySelector('.error__button');
  await closeErrPopupBtn.addEventListener('click', onBtnCloseError);
  await document.addEventListener('keydown', (evt) => {
    onEscKeydownCloseError(evt);
    removeBtnCloseListner(closeErrPopupBtn);
  })
};

export { showErrorPopupMessage };

