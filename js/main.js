const getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
getRandomInteger();

const getRandomFloat = function (min, max, NUMBER_ORDER) {
  return (Math.random() * (max - min) + min).toFixed(NUMBER_ORDER);
}
getRandomFloat();
