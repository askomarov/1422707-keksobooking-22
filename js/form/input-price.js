import { changeAttribute } from '../util.js'
// «Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»;
// 3.3.Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.
// Обратите внимание: вместе с минимальным значением цены нужно изменять и плейсхолдер.
// Обратите внимание: ограничение минимальной цены заключается именно в изменении минимального значения, которое можно ввести в поле с ценой, изменять само значение поля не нужно, это приведёт к плохому UX(опыту взаимодействия).Даже если текущее значение не попадает под новые ограничения, не стоит без ведома пользователя изменять значение поля.

const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price')

const checkTypePrice = () => {
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

const getPriceOfType = () => {
  let typePrice = checkTypePrice();
  return typePrice;
};

const setInputMinPrice = () => {
  selectType.addEventListener('change', () => {
    changeAttribute(inputPrice, 'placeholder', getPriceOfType())
    changeAttribute(inputPrice, 'min', getPriceOfType())
  });
};

export { setInputMinPrice };
