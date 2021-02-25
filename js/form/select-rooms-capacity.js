const syncSelects = (mainSelect, selectToSync) => {
  const options = selectToSync.options;

  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    if (mainSelect.value == 1) {
      if (option.value != 1) {
        option.selected = false;
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
    if (mainSelect.value == 2) {
      if (option.value == 1 || option.value == 2) {
        option.selected = true;
        option.removeAttribute('disabled', 'disabled');
      } else {
        option.setAttribute('disabled', 'disabled');
        option.selected = false;
      }
    }
    if (mainSelect.value == 3) {
      if (option.value == 0) {
        option.selected = false;
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
    if (mainSelect.value == 100) {
      if (option.value == 0) {
        option.selected = true;
        option.removeAttribute('disabled', 'disabled');
      } else {
        option.setAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
  }
}

export { syncSelects }
