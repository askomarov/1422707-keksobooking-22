/*global L:readonly*/
import { makeFormsActive } from './form/active-disabled-forms.js';
import { showAlert } from './util.js';
import { createOfferElemtns } from './popup.js';
import { getDataFromServer } from './server.js'
import { makeFormsDisabled } from './form/active-disabled-forms.js';

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

const simplePinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const adForm = document.querySelector('.ad-form');
const inputAddress = adForm.querySelector('#address');

// функция получения координат метки при заверешении ее перемещения и функция вставки данных в инпут
const movePinPasteLocation = (pin, input) => {
  pin.on('moveend', (evt) => {
    const addressXY = evt.target.getLatLng();
    const a = addressXY.lat.toFixed(5);
    const b = addressXY.lng.toFixed(5);
    input.value = `${a}, ${b}`;
  });
};

const loadMap = async () => {
  try {
    map.on('load', () => {
      makeFormsActive();
    })
      .setView({
        lat: 35.6817,
        lng: 139.75388,
      }, 13);
  } catch (error) { showAlert(error); makeFormsDisabled() }
}

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

// функция получения меток из массива сгенерированных объявлений
const createPointsOnMap = (map, array, icon) => {
  return new Promise(() => {
    // создадим массив данных объявлений для метками
    const points = array;
    // создаим массив html элементов по шаблону для попапов
    const pointElements = createOfferElemtns(points);

    // для каждой метки получим данные, настроим попап и выведем на карту
    points.forEach((point, index) => {
      const lat = point.location.lat;
      const lng = point.location.lng;
      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: icon,
        },
      );
      marker
        // каждая метка добавляется на карту
        .addTo(map)
        // для каждой метки в попап выводим html элемент
        .bindPopup(
          pointElements[index],
          {
            keepInView: true,
          },
        );
    })
  })
};

const initMapWhitServerData = async function () {
  getDataFromServer
    .then((data) => {
      createPointsOnMap(map, data, simplePinIcon)
    })
    .catch((err) => {
      showAlert('Ошибка..:' + err);
    });

  await loadMap().then(initMap);
};

export { initMapWhitServerData }
