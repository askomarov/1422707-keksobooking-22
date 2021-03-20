import { changeAttribute, isEscEvent } from './util.js'
import { setPositionMainPin, resetMarkers } from './map.js';
import { sendData } from './get-send-data.js';
import { resetImageSrc, resetBackgroundPreview } from './preview-avatar-background.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const buttonResetAdForm = document.querySelector('.ad-form__reset');
const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldsets = mapForm.querySelectorAll('fieldset');
const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
//////////// активация/дезактивация форм
const makeFormsDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.setAttribute('disabled', 'disabled')
  });
  mapForm.classList.add('map__filters--disabled');
  mapFormFieldsets.forEach(fieldset => {
    fieldset.setAttribute('disabled', 'disabled')
  });
  mapFormSelects.forEach(select => {
    select.setAttribute('disabled', 'disabled')
  });
};

const makeAddFormsActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.removeAttribute('disabled')
  });
};

const makeMapFormsActive = () => {
  mapForm.classList.remove('map__filters--disabled');
  mapFormFieldsets.forEach(fieldset => {
    fieldset.removeAttribute('disabled')
  });
  mapFormSelects.forEach(select => {
    select.removeAttribute('disabled')
  });
};
//////////////////// синхнориназция типа жилья и его цены
const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const getPriceOfType = () => {
  if (selectType.value === 'bungalow') {
    return '0';
  }
  if (selectType.value === 'flat') {
    return '1000';
  }
  if (selectType.value === 'palace') {
    return '10000';
  }
  if (selectType.value === 'house') {
    return '5000';
  }
};

const setInputMinPrice = () => {
  changeAttribute(inputPrice, 'placeholder', getPriceOfType());
  changeAttribute(inputPrice, 'min', getPriceOfType());
  selectType.addEventListener('change', () => {
    changeAttribute(inputPrice, 'placeholder', getPriceOfType());
    changeAttribute(inputPrice, 'min', getPriceOfType());
  });
};
///////////////////////////// синзронизация врмени заезда/выезда
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const syncSelectValue = (select1, select2) => {
  select1.addEventListener('change', () => {
    let options = select2.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === select1.value) {
        options[i].selected = true;
      }
    }
  })
};

const syncCheckTime = () => {
  syncSelectValue(timeIn, timeOut);
  syncSelectValue(timeOut, timeIn);
};
///////////// синхронизация кол-ва комнат и жильцов
const syncSelects = (mainSelect, selectToSync) => {
  const options = selectToSync.options;

  if (mainSelect.value == 1) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value != 1) {
        option.selected = false;
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
  }

  if (mainSelect.value == 2) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == 1 || option.value == 2) {
        option.selected = true;
        option.removeAttribute('disabled', 'disabled');
      } else {
        option.setAttribute('disabled', 'disabled');
        option.selected = false;
      }
    }
  }

  if (mainSelect.value == 3) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == 0) {
        option.selected = false;
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
  }

  if (mainSelect.value == 100) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == 0) {
        option.selected = true;
        option.removeAttribute('disabled', 'disabled');
      } else {
        option.setAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
  }
};
const roomsSelectListener = () => {
  roomsSelect.addEventListener('change', () => {
    syncSelects(roomsSelect, capacitySelect);
  });
};

//////// показ и скрытие сообщени при неусешной отправки формы
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

//////// показ и скрытие сообщени при усешной отправки формы
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

const onResetForm = () => {
  adForm.reset();
  mapForm.reset();
  setPositionMainPin();
  resetImageSrc();
  resetBackgroundPreview();
  resetMarkers();
};

const showSuccessPopupMessage = () => {
  const messageElement = succeessMessageTemplate.cloneNode(true);
  mainContentWrap.append(messageElement);
  document.addEventListener('keydown', onEscKeydownCloseSuccess);
  document.addEventListener('click', onClickCloseSuccess);
  onResetForm();
};
///////// отправка формы нового объяаления
const submitForm = (sendURL, onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(sendURL, new FormData(evt.target), onSuccess, onFail);
  });
};
///////сброс формы по клику
const onBtnResetAddFormListener = () => {
  buttonResetAdForm.addEventListener('click', () => {
    onResetForm();
  });
};

export { makeFormsDisabled, makeAddFormsActive, makeMapFormsActive, setInputMinPrice, syncCheckTime, syncSelects, showErrorPopupMessage, showSuccessPopupMessage, submitForm, onBtnResetAddFormListener, roomsSelectListener, onResetForm }
