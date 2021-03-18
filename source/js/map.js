/*global L:readonly*/
import { makeFormsDisabled, makeAddFormsActive } from './form.js';
import { showAlert } from './util.js';
import { createOnePopupELement } from './popup.js';

const OFFER_QUANTITY = 10;

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

const markers = [];
// функция получения меток из массива данных
const createPointsOnMap = (array) => {
  array.slice(0, OFFER_QUANTITY).forEach((point) => {
    const marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: simplePinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(
        createOnePopupELement(point),
        {
          keepInView: true,
        });
    markers.push(marker)
  });
};

const deleteMarker = () => {
  markers.forEach(marker => {
    marker.remove()
  });
};


const setPositionMainPin = () => {
  mainPinMarker.setLatLng([35.6817, 139.753882])
};

export { createPointsOnMap, deleteMarker, loadMap, setPositionMainPin }
