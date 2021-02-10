import { getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomLengthArray } from './util.js';

// значение кол-ва генерированных объектов
const SIMILAR_OBJECT_COUNT = 10;

// данные для объекта недвижимости
const HOUSE_TITLE = [
  'супер предложение',
  'ограниченное предложение',
  'специально для Вас',
  'лучшее предложение в данной категории',
];
const HOUSE_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKINS_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const ROOM_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const HOUSE_DESC = [
  'интерьев выполнен в минималистичном стиле',
  'можно с животными',
  'хозяин - гид проводит экскурсии',
  'ближайший магазинчик лучший в районе по морепродуктам',
];
const HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const MIN_X = 35.65;
const MAX_X = 35.70;
const MIN_Y = 139.70;
const MAX_Y = 139.80;
const LOCATION_NUM_ORDER = 5;

const mainObject = () => {
  // генерация случайного номера в название аватара
  const randomNumberImage = '0' + getRandomInteger(1, 8);

  // генерируем случайные значения координат
  const ADRESS_X = getRandomFloat(MIN_X, MAX_X, LOCATION_NUM_ORDER);
  const ADRESS_Y = getRandomFloat(MIN_Y, MAX_Y, LOCATION_NUM_ORDER);

  const result = {
    author: {
      avatar: 'img/avatars/user' + randomNumberImage + '.png',
    },
    offer: {
      title: getRandomArrayElement(HOUSE_TITLE),
      address: `${ADRESS_X}, ${ADRESS_Y}`,
      price: getRandomInteger(1, 100000),
      type: getRandomArrayElement(HOUSE_TYPE),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECKINS_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      description: getRandomArrayElement(HOUSE_DESC),
      features: getRandomLengthArray(ROOM_FEATURES),
      photos: getRandomLengthArray(HOUSE_PHOTOS),
    },
    location: {
      x: Number(ADRESS_X),
      y: Number(ADRESS_Y),
    },
  }
  return result;
};
//получаем готовый массив объектов
const mainObjectList = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => mainObject());
// console.log(mainObjectList);
mainObjectList;
