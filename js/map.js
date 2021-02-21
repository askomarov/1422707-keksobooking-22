import { makeFormsActive } from './form/active-disabled-forms.js';
import { createOffers } from './data.js';
import { createOfferElemtns } from './popup.js';

const mapWrapper = document.querySelector('#map-canvas');

// иконка главной метки
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
// главная метка
const mainPinMarker = L.marker(
  {
    lat: 35.6817,
    lng: 139.753882,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const simplePinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
// функция получения координат главной метки при заверешении ее перемещения
// и вставки их в инпут
const setNewAddress = () => {
  const newAddress = {
    x: '',
    y: '',
  };
  mainPinMarker.on('moveend', (evt) => {
    const addressXY = evt.target.getLatLng();
    newAddress.x = addressXY.lat.toFixed(5);
    newAddress.y = addressXY.lng.toFixed(5);

    const adForm = document.querySelector('.ad-form');
    const inputAddress = adForm.querySelector('#address');

    inputAddress.value = `${newAddress.x}, ${newAddress.y}`
  });
};


// функция получения меток из массива сгенерированных объявлений
const createPoints = (map) => {
  // создадим массив данных объявлений для метками
  const points = createOffers();
  // создаим массив html элементов по шаблону для попапов
  const pointElements = createOfferElemtns(points);

  // для каждой метки получим данные, настроим попап и выведем на карту
  points.forEach((point, index) => {
    const lat = point.location.x;
    const lng = point.location.y;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: simplePinIcon,
      },
    );
    marker
      // каждая метка добавляется на карту
      .addTo(map)
      // для каждой метки в попап выводим html элемент
      .bindPopup(pointElements[index]);
  });
}

const initMap = () => {
  const map = L.map(mapWrapper)
    .on('load', () => {
      // при загрузке карты - формы разблокируются
      makeFormsActive();
    })
    .setView({
      lat: 35.6817,
      lng: 139.75388,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // добавлние главной метки на карту
  mainPinMarker.addTo(map);

  createPoints(map);

  setNewAddress();
};

export { initMap };

