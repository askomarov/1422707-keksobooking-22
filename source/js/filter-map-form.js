/* global _:readonly */
import { createPointsOnMap, deleteMarker } from './map.js';

const RERENDER_DELAY = 500;
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;

const mapFiltersForm = document.querySelector('.map__filters');
const houseTypeFilter = mapFiltersForm.querySelector('#housing-type');
const housePriceFilter = mapFiltersForm.querySelector('#housing-price');
const houseRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const houseGuestsFilter = mapFiltersForm.querySelector('#housing-guests');

const filterByType = (item) => {
  if (houseTypeFilter.value === 'any' || item.offer.type === houseTypeFilter.value) {
    return true
  } false;
};

const filterByPrice = (item) => {
  if (housePriceFilter.value === 'any') {
    return true
  } else if (housePriceFilter.value === 'middle') {
    return item.offer.price >= PRICE_LOW && item.offer.price < PRICE_HIGH
  } else if (housePriceFilter.value === 'low') {
    return item.offer.price < PRICE_LOW
  } else if (housePriceFilter.value === 'high') {
    return item.offer.price >= PRICE_HIGH
  } return false
};

const filterByFeatures = (item) => {
  const checkedFeatures = mapFiltersForm.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures.length === 0) {
    return true
  } else {
    let intemIncludeFeature = 0;
    checkedFeatures.forEach((feature) => {
      if (item.offer.features.includes(feature.value)) {
        intemIncludeFeature++;
      } false
    });
    if (intemIncludeFeature === checkedFeatures.length) {
      return true
    } false
  }
};

const filterByRooms = (item) => {
  if (houseRoomsFilter.value === 'any' || item.offer.rooms === Number(houseRoomsFilter.value)) {
    return true
  } false
};

const filterByGuests = (item) => {
  if (houseGuestsFilter.value === 'any' || item.offer.guests === Number(houseGuestsFilter.value)) {
    return true
  } false
};

const renderFilteredArray = (array) => {
  const filteredArray = array
    .filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures);
  deleteMarker();
  createPointsOnMap(filteredArray);
};

const filterMapForm = (array) => {
  mapFiltersForm.addEventListener('change', _.debounce(() =>
    renderFilteredArray(array), RERENDER_DELAY,
  ));
};

export { filterMapForm };
