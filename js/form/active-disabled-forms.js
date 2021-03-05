const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldsets = mapForm.querySelectorAll('fieldset');

const makeFormsDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.setAttribute('disabled', 'disabled')
  });

  mapForm.classList.add('map__filters--disabled');
  mapFormFieldsets.forEach(fieldset => {
    fieldset.setAttribute('disabled', 'disabled')
  });
  mapFormSelects.forEach(select => {
    select.setAttribute('disabled', 'disabled')
  });
}

const makeFormsActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach(fieldset => {
    fieldset.removeAttribute('disabled')
  });

  mapForm.classList.remove('map__filters--disabled');
  mapFormFieldsets.forEach(fieldset => {
    fieldset.removeAttribute('disabled')
  });
  mapFormSelects.forEach(select => {
    select.removeAttribute('disabled')
  });
}

export { makeFormsDisabled, makeFormsActive }
