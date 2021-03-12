/*global L:readonly*/
import { makeFormsDisabled, makeAddFormsActive } from './form/active-disabled-forms.js';
import { showAlert } from './util.js';
import { createPopupElements } from './popup.js';

const mapWrapper = document.querySelector('#map-canvas');
const map = L.map(mapWrapper);

// иконка главной метки
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
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
// метки объявлений
const simplePinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
// инпут в который вставляем геоданные главной метки
const adForm = document.querySelector('.ad-form');
const inputAddress = adForm.querySelector('#address');
// функция получения координат метки при заверешении ее перемещения и вставки данных в инпут
const movePinPasteLocation = (pin, input) => {
  pin.on('moveend', (evt) => {
    const addressXY = evt.target.getLatLng();
    const a = addressXY.lat.toFixed(5);
    const b = addressXY.lng.toFixed(5);
    input.value = `${a}, ${b}`;
  });
};
const initMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // добавлние главной метки на карту
  mainPinMarker.addTo(map);
  movePinPasteLocation(mainPinMarker, inputAddress);
};

const loadMap = () => {
  try {
    map.on('load', () => {
      makeAddFormsActive();
      initMap();
    })
      .setView({
        lat: 35.6817,
        lng: 139.75388,
      }, 13);
  } catch (error) { showAlert(error); makeFormsDisabled() }
};



const createSimplePinMap = (lat, lng, popupElement) => {
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
    .bindPopup(
      popupElement,
      {
        keepInView: true,
      },
    );
};

// функция получения меток из массива сгенерированных объявлений
const createPointsOnMap = (array) => {
  // создаим массив html элементов по шаблону для попапов
  const pointPopupElements = createPopupElements(array);
  // для каждой метки получим данные, настроим попап и выведем на карту
  array.forEach((point, index) => {
    const lat = point.location.lat;
    const lng = point.location.lng;
    createSimplePinMap(lat, lng, pointPopupElements[index])
  })
};

const setPositionMainPin = () => {
  mainPinMarker.setLatLng([35.6817, 139.753882])
};

export { createPointsOnMap, loadMap, setPositionMainPin }
