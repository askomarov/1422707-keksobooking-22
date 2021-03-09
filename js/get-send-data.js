const getData = (getURL) => {
  return fetch(getURL)
    .then((response) => response.json())
};

const sendData = (url, data, onSuccess, onFail) => {
  return fetch(url,
    {
      method: 'POST',
      body: data,
    },
  )
    .then(onSuccess)
    .catch(onFail)
};


export { getData, sendData };
