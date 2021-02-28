const syncSelects = (mainSelect, selectToSync) => {
  const options = selectToSync.options;

  if (mainSelect.value == 1) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value != 1) {
        option.selected = false;
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
  }

  if (mainSelect.value == 2) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == 1 || option.value == 2) {
        option.selected = true;
        option.removeAttribute('disabled', 'disabled');
      } else {
        option.setAttribute('disabled', 'disabled');
        option.selected = false;
      }
    }
  }

  if (mainSelect.value == 3) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == 0) {
        option.selected = false;
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        option.selected = true;
      }
    }
  }

  if (mainSelect.value == 100) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
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
