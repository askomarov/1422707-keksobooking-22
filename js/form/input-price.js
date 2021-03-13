import { changeAttribute } from '../util.js'

const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price')

const getPriceOfType = () => {
  if (selectType.value === 'bungalow') {
    return '0';
  }
  if (selectType.value === 'flat') {
    return '1000';
  }
  if (selectType.value === 'palace') {
    return '10000';
  }
  if (selectType.value === 'house') {
    return '5000';
  }
}

const setInputMinPrice = () => {
  changeAttribute(inputPrice, 'placeholder', getPriceOfType());
  changeAttribute(inputPrice, 'min', getPriceOfType());
  selectType.addEventListener('change', () => {
    changeAttribute(inputPrice, 'placeholder', getPriceOfType());
    changeAttribute(inputPrice, 'min', getPriceOfType());
  });
};

export { setInputMinPrice };
