
const sendData = async (url, data) => {
  await fetch(url,
    {
      method: 'POST',
      body: data,
    },
  )
}

const submitForm = (form, url, onSuccess, onFail) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(url, formData)
      .then(onSuccess)
      .then(form.reset())
      .catch(onFail)
  });
};

export { submitForm }
