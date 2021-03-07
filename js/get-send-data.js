import { showAlert } from './util.js';

const getURL = 'https://22.javascript.pages.academy/keksobooking/data';

const getDataFromServer = () => {
  return fetch(getURL)
    .then((response) => response.json())
    .catch(() => {
      showAlert('При загрузке данных с сервера произошла ошибка');
    });
};

const sendData = async (url, data) => {
  fetch(url,
    {
      method: 'POST',
      body: data,
    },
  )
};

export { getDataFromServer, sendData };
