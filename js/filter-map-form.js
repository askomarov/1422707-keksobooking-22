/* global _:readonly */
import { createPointsOnMap, deleteMarker } from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const houseTypeFilter = mapFiltersForm.querySelector('#housing-type');
const housePriceFilter = mapFiltersForm.querySelector('#housing-price');
const houseRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const houseGuestsFilter = mapFiltersForm.querySelector('#housing-guests');


const FILTERED_OFFER_QUANTITY = 10;
// не чаще, чем раз в полсекунды (устранение дребезга).
const RERENDER_DELAY = 500;
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;


const featuresFilter = (item) => {
  const checkedFeatures = mapFiltersForm.querySelectorAll('.map__checkbox:checked');
  let i = 0;
  checkedFeatures.forEach((feature) => {
    if (item.offer.features.includes(feature.value))
      i++;
  });
  return i === checkedFeatures.length;
};

const typeFilter = (item) => {
  return houseTypeFilter.value === 'any' || item.offer.type === houseTypeFilter.value;
};

const roomsFilter = (item) => {
  return houseRoomsFilter.value === 'any' || item.offer.rooms === Number(houseRoomsFilter.value);
};

const capacityFilter = (item) => {
  return houseGuestsFilter.value === 'any' || item.offer.guests === Number(houseGuestsFilter.value);
};

const priceFilter = (item) => {
  const filterPrice = housePriceFilter.value;
  const itemPrice = item.offer.price;

  switch (filterPrice) {
    case 'middle':
      return itemPrice >= PRICE_LOW && itemPrice < PRICE_HIGH;
    case 'low':
      return itemPrice < PRICE_LOW;
    case 'high':
      return itemPrice >= PRICE_HIGH;
    default:
      return true;
  }
};

const isItemMatched = (item) => {
  if (featuresFilter(item) && roomsFilter(item) && capacityFilter(item) &&
    priceFilter(item) && typeFilter(item)) {
    return true;
  }
};

const getFilteredItems = (array) => {
  const filteredItems = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (isItemMatched(item)) {
      filteredItems.push(item);
    }
    if (filteredItems.length === FILTERED_OFFER_QUANTITY) {
      return filteredItems;
    }
  }
  return filteredItems;
};

const onFilterChange = (array) => {
  const filteredItems = getFilteredItems(array);
  deleteMarker();
  createPointsOnMap(filteredItems);
};

const turnOnFilterListener = (array) => {
  mapFiltersForm.addEventListener('change', _.debounce(() => onFilterChange(array), RERENDER_DELAY,
  ));
};

export { turnOnFilterListener }
