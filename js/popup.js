import { checkHouseType } from './util.js'

// функция генерации элементов готовых объявлений которая наполнит мой массив offerElementsList
const createOfferElemtns = (array) => {
  // создаю массив в который положу сгенерированные элементы готовых объявлений
  const offerElementsList = [];
  // html шаблон который будем копировать
  const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

  // теперь для каждого объекта данных из массива сгенерируем элементы
  array.forEach((arrayItem) => {
    // функция вставки доступных удобств
    const getFeaturesElemnts = function (item) {
      const popupFeatures = item.querySelector('.popup__features');
      if (arrayItem.offer.features.length === 0) {
        popupFeatures.remove();
      }
      arrayItem.offer.features.forEach((featureItem) => {
        const featureItemTemplate = `<li class="popup__feature popup__feature--${featureItem}"></li>`;
        popupFeatures.insertAdjacentHTML('beforeend', featureItemTemplate)
      });
    };
    // функция вставки изображений объявления
    const getPhotosElemnts = function (item) {
      const popupPhotos = item.querySelector('.popup__photos');
      if (arrayItem.offer.photos.length === 0) {
        popupPhotos.remove();
      }
      arrayItem.offer.photos.forEach((popupPhoto, index) => {
        const photoTemplate = `<img src="${popupPhoto}" class="popup__photo" width="45" height="40" alt="Фотография жилья ${index + 1}">`;
        popupPhotos.insertAdjacentHTML('beforeend', photoTemplate);
      });
    }
    // копируем шаблон со всем его содержимым true в новую переменную
    const offerElement = similarCardTemplate.cloneNode(true);

    // заполняем данными конкертного объекта
    offerElement.querySelector('.popup__avatar').src = arrayItem.author.avatar;
    offerElement.querySelector('.popup__features').innerHTML = '';
    getFeaturesElemnts(offerElement);
    offerElement.querySelector('.popup__title').textContent = arrayItem.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = arrayItem.offer.address;
    offerElement.querySelector('.popup__text--price').innerHTML = arrayItem.offer.price + ' <span>₽/ночь</span>';
    offerElement.querySelector('.popup__type').textContent = checkHouseType(arrayItem);
    offerElement.querySelector('.popup__text--capacity').textContent = `${arrayItem.offer.rooms} команты для ${arrayItem.offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${arrayItem.offer.checkin}, выезд до ${arrayItem.offer.checkout}`;
    offerElement.querySelector('.popup__description').textContent = arrayItem.offer.description;
    offerElement.querySelector('.popup__photos').innerHTML = ''; getPhotosElemnts(offerElement);
    // каждый сгенерированный элемент объявления кладем в массив
    offerElementsList.push(offerElement);
  });
  return offerElementsList;
};

export { createOfferElemtns };