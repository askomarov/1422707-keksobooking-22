const syncSelects = (selectMain, selectToSync) => {
  const selectToSyncOptions = selectToSync.options;
  selectToSyncOptions[2].selected = true;
  selectMain.addEventListener('click', () => {
    for (let index = 0; index < selectToSyncOptions.length; index++) {

      if (selectMain.value == 1) {
        if (selectToSyncOptions[index].value != 1) {
          selectToSyncOptions[index].setAttribute('disabled', 'disabled');
          selectToSyncOptions[index].selected = false;
        } else {
          selectToSyncOptions[2].selected = true;
        }
      }
      if (selectMain.value == 2) {
        if (selectToSyncOptions[index].value == 2 || selectToSyncOptions[index].value == 1) {
          selectToSyncOptions[2].selected = true;
          selectToSyncOptions[index].removeAttribute('disabled', 'disabled');
        } else { selectToSyncOptions[index].setAttribute('disabled', 'disabled'); }
      }
      if (selectMain.value == 3) {
        if (selectToSyncOptions[index].value != 0) {
          selectToSyncOptions[2].selected = true;
          selectToSyncOptions[index].removeAttribute('disabled', 'disabled');
        } else { selectToSyncOptions[index].setAttribute('disabled', 'disabled'); }
      }
      if (selectMain.value == 100) {
        if (selectToSyncOptions[index].value != 0) {
          selectToSyncOptions[index].setAttribute('disabled', 'disabled');
        } else {
          selectToSyncOptions[index].removeAttribute('disabled', 'disabled');
          selectToSyncOptions[index].selected = true;
        }
      }
    }
  });
}

export { syncSelects };

