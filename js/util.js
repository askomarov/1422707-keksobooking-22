const getRandomInteger = function (min, max) {
  if (min < 0 || max < 0) {
    return alert('диапазон может быть только положительный, включая ноль.')
  } else if (max < min) {
    return Math.round(Math.random() * (min - max)) + max;
  } else if (min === max) {
    return min;
  }
  return Math.round(Math.random() * (max - min)) + min;
};

const getRandomFloat = function (min, max, NUMBER_ORDER) {
  if (min < 0 || max < 0) {
    return alert('диапазон может быть только положительный, включая ноль.')
  } else if (max < min) {
    return ((Math.random() * (min - max)) + max).toFixed(NUMBER_ORDER);
  } else if (min === max) {
    return min.toFixed(NUMBER_ORDER);
  }
  return (Math.random() * (max - min) + min).toFixed(NUMBER_ORDER);
};

const checkStringLength = function (string, maxLength = 140) {
  return string.length <= maxLength
}
//  функция получения случайного элемента из массива
const getRandomArrayElement = (elemets) => {
  return elemets[getRandomInteger(0, elemets.length - 1)];
};

//  функция получения массива случайной длинны из массива
const getRandomLengthArray = (elemets) => {
  return elemets.slice(0, elemets.length - getRandomInteger(0, elemets.length));
};

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
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomLengthArray, checkHouseType, changeAttribute, checkStringLength, showAlert, isEscEvent };
