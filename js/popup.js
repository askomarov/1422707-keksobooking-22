import { createOffers } from './data.js';
import { checkHouseType } from './util.js'
// получаем наш массив объетов данных для объявлений
const similiarOffers = createOffers();

// родитель в который надо вставляем элемент готового объявления
const cardWrapper = document.querySelector('#map-canvas');

// создаю массив в который положу сгенерированные элементы готовых объявлений
const offerElementsList = [];

// функция генерации элементов готовых объявлений которая наполнит мой массив offerElementsList
const getOfferItems = () => {
  // html шаблон который будем копировать
  const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

  // теперь для каждого объекта данных из массива сгенерируем элементы
  similiarOffers.forEach((offerItem) => {
    // функция вставки доступных удобств
    const getFeaturesElemnts = function (item) {
      const popupFeatures = item.querySelector('.popup__features');
      if (offerItem.offer.features.length === 0) {
        popupFeatures.remove();
      }
      offerItem.offer.features.forEach((featureItem) => {
        const featureItemTemplate = `<li class="popup__feature popup__feature--${featureItem}"></li>`;
        popupFeatures.insertAdjacentHTML('beforeend', featureItemTemplate)
      });
    };
    // функция вставки изображений объявления
    const getPhotosElemnts = function (item) {
      const popupPhotos = item.querySelector('.popup__photos');
      if (offerItem.offer.photos.length === 0) {
        popupPhotos.remove();
      }
      offerItem.offer.photos.forEach((popupPhoto, index) => {
        const photoTemplate = `<img src="${popupPhoto}" class="popup__photo" width="45" height="40" alt="Фотография жилья ${index + 1}">`;
        popupPhotos.insertAdjacentHTML('beforeend', photoTemplate);
      });
    }
    // копируем шаблон со всем его содержимым true в новую переменную
    const offerElement = similarCardTemplate.cloneNode(true);

    // заполняем данными конкертного объекта
    offerElement.querySelector('.popup__avatar').src = offerItem.author.avatar;
    offerElement.querySelector('.popup__features').innerHTML = '';
    getFeaturesElemnts(offerElement);
    offerElement.querySelector('.popup__title').textContent = offerItem.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    offerElement.querySelector('.popup__text--price').innerHTML = offerItem.offer.price + ' <span>₽/ночь</span>';
    offerElement.querySelector('.popup__type').textContent = checkHouseType(offerItem);
    offerElement.querySelector('.popup__text--capacity').textContent = `${offerItem.offer.rooms} команты для ${offerItem.offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerItem.offer.checkin}, выезд до ${offerItem.offer.checkout}`;
    offerElement.querySelector('.popup__description').textContent = offerItem.offer.description;
    offerElement.querySelector('.popup__photos').innerHTML = ''; getPhotosElemnts(offerElement);
    // каждый сгенерированный элемент объявления кладем в массив
    offerElementsList.push(offerElement);
  });
  return offerElementsList;
};
// вызываем функцию генерации элементов объявлений
getOfferItems()

// добваляем в разметку одно любое объявление, например первое в массиве
cardWrapper.appendChild(offerElementsList[0]);
