
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout')

const syncSelectValue = (select1, select2) => {
  select1.addEventListener('change', () => {
    let options = select2.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === select1.value) {
        options[i].selected = true;
      }
    }
  })
};
const syncCheckTime = () => {
  syncSelectValue(timeIn, timeOut);
  syncSelectValue(timeOut, timeIn);
}
export { syncCheckTime };
