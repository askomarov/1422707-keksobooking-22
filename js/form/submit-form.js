const submitForm = (form, url, onSuccess) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // собираем данные формы
    const formData = new FormData(evt.target);

    fetch(
      url,
      {
        method: 'POST',
        body: formData,
      },
    ).then(() => onSuccess());
  });
};

export { submitForm }
