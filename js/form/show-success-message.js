import { isEscEvent } from '../util.js';

const mainContentWrap = document.querySelector('main')
const succeessMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const showSuccessPopupMessage = async () => {
  const messageElement = succeessMessageTemplate.cloneNode(true);
  await mainContentWrap.append(messageElement)
  await document.addEventListener('keydown', onEscKeydownCloseSuccess)
  await document.addEventListener('click', onClickCloseSuccess)
};

const onEscKeydownCloseSuccess = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const onClickCloseSuccess = () => {
  closeSuccessPopup();
};

const closeSuccessPopup = () => {
  const successElementMessage = document.querySelector('.success')
  successElementMessage.remove();
  document.removeEventListener('keydown', onEscKeydownCloseSuccess);
  document.removeEventListener('click', onClickCloseSuccess)
}

export { showSuccessPopupMessage };
