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

//  функция получения случайного элемента из массива
const getRandomArrayElement = (elemets) => {
  return elemets[getRandomInteger(0, elemets.length - 1)];
};

//  функция получения массива случайной длинны из массива
const getRandomLengthArray = (elemets) => {
  return elemets.slice(0, elemets.length - getRandomInteger(0, elemets.length));
};
export { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomLengthArray };