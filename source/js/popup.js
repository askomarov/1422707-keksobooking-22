import { checkHouseType } from './util.js';
// html шаблон который будем копировать
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
// функция вставки доступных удобств
const renderFeaturesElemnts = (arrayItem, item) => {
  const popupFeatures = item.querySelector('.popup__features');
  if (arrayItem.offer.features.length === 0) {
    popupFeatures.remove();
  }
  arrayItem.offer.features.forEach((featureItem) => {
    const featureItemTemplate = `<li class="popup__feature popup__feature--${featureItem}"></li>`;
    popupFeatures.insertAdjacentHTML('beforeend', featureItemTemplate);
  });
};
// функция вставки изображений объявления
const renderPhotosElemnts = (arrayItem, item) => {
  const popupPhotos = item.querySelector('.popup__photos');
  if (arrayItem.offer.photos.length === 0) {
    popupPhotos.remove();
  }
  arrayItem.offer.photos.forEach((popupPhoto, index) => {
    const photoTemplate = `<img src="${popupPhoto}" class="popup__photo" width="45" height="40" alt="Фотография жилья ${index + 1}">`;
    popupPhotos.insertAdjacentHTML('beforeend', photoTemplate);
  });
};

const fillPopupElement = (arrayItem, newElement) => {
  // заполняем данными конкертного объекта
  newElement.querySelector('.popup__avatar').src = arrayItem.author.avatar;
  newElement.querySelector('.popup__features').innerHTML = '';
  newElement.querySelector('.popup__title').textContent = arrayItem.offer.title;
  newElement.querySelector('.popup__text--address').textContent = arrayItem.offer.address;
  // newElement.querySelector('.popup__text--price').innerHTML = arrayItem.offer.price + ' <span>₽/ночь</span>';
  newElement.querySelector('.popup__text--price').firstChild.textContent = arrayItem.offer.price + ' ';
  newElement.querySelector('.popup__type').textContent = checkHouseType(arrayItem);
  newElement.querySelector('.popup__text--capacity').textContent = `${arrayItem.offer.rooms} команты для ${arrayItem.offer.guests} гостей`;
  newElement.querySelector('.popup__text--time').textContent = `Заезд после ${arrayItem.offer.checkin}, выезд до ${arrayItem.offer.checkout}`;
  newElement.querySelector('.popup__description').textContent = arrayItem.offer.description;
  newElement.querySelector('.popup__photos').innerHTML = '';
  return newElement;
};

// функция генерации одного элемента
const createPopupELement = (element) => {
  const popupElement = similarCardTemplate.cloneNode(true);
  fillPopupElement(element, popupElement);
  renderFeaturesElemnts(element, popupElement);
  renderPhotosElemnts(element, popupElement);
  return popupElement;
};

export { createPopupELement };
