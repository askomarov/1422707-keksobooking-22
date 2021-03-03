const showSuccessMessage = (messageTemlate, parentElemnt) => {
  // копируем шаблон со всем его содержимым true в новую переменную
  const messageElement = messageTemlate.cloneNode(true);
  parentElemnt.append(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, 1000);
}

export { showSuccessMessage };
