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
  return houseTypeFilter.value === 'any' || item.offer.type === houseTypeFilter.value;
};

const filterByPrice = (item) => {
  if (housePriceFilter.value === 'any') {
    return true;
  } else if (housePriceFilter.value === 'middle') {
    return item.offer.price >= PRICE_LOW && item.offer.price < PRICE_HIGH;
  } else if (housePriceFilter.value === 'low') {
    return item.offer.price < PRICE_LOW;
  } else if (housePriceFilter.value === 'high') {
    return item.offer.price >= PRICE_HIGH;
  } return false;
};

const filterByFeatures = (item) => {
  const checkedFeatures = mapFiltersForm.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures.length === 0) {
    return true;
  }
  for (let feature of checkedFeatures) {
    if (!item.offer.features.includes(feature.value)) {
      return false;
    }
  }
  return true;
};

const filterByRooms = (item) => {
  return houseRoomsFilter.value === 'any' || item.offer.rooms === Number(houseRoomsFilter.value);
};

const filterByGuests = (item) => {
  return houseGuestsFilter.value === 'any' || item.offer.guests === Number(houseGuestsFilter.value)
};

const filteredItem = (item) => {
  return filterByType(item) && filterByPrice(item) && filterByFeatures(item) && filterByRooms(item) && filterByGuests(item);
};

const renderFilteredArray = (array) => {
  const filteredItems = array.filter(filteredItem)
  deleteMarker();
  createPointsOnMap(filteredItems);
};

const filterMapForm = (array) => {
  mapFiltersForm.addEventListener('change', _.debounce(() =>
    renderFilteredArray(array), RERENDER_DELAY,
  ));
};

export { filterMapForm };
