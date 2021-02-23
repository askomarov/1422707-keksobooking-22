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

const checkStringLength = function (string, MAX_LENGTH = 140) {
  return string.length <= MAX_LENGTH
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

export { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomLengthArray, checkHouseType, changeAttribute, checkStringLength };
