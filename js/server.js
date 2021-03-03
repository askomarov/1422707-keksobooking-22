import { showAlert } from './util.js';

const serverUrl = 'https://22.javascript.pages.academy/keksobooking/data'

const getDataFromServer = new Promise((resolve) => {
  fetch(serverUrl)
    .then((response) => response.json())
    .then((data) => {
      resolve(data)
    })
    .catch(() => {
      showAlert('При загрузке данных с сервера произошла ошибка');
    });
})

export { getDataFromServer };
