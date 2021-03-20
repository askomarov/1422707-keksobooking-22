// проверка типа жилья
const checkHouseType = function (element) {
  if (element.offer.type === 'flat') {
    return 'Квартира';
  }
  if (element.offer.type === 'bungalow') {
    return 'Бунгало';
  }
  if (element.offer.type === 'palace') {
    return 'Дворец';
  }
  if (element.offer.type === 'house') {
    return 'Дом';
  }
};

const changeAttribute = (item, attr, value) => {
  item.setAttribute(attr, value);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '320px';
  alertContainer.style.height = 'auto';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export { checkHouseType, changeAttribute, showAlert, isEscEvent };
