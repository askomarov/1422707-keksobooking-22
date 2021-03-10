const getData = (getURL, onSuccess) => {
  return fetch(getURL)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
};

const sendData = (sendUrl, body, onSuccess, onFail) => {
  return fetch(sendUrl,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
