export default function createWebsocket($errorsDiv){
  var socket = new WebSocket('ws://some.url/user');
  socket.onopen = function() {
    console.log("Соединение установлено.");
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      showErrors($errorsDiv, ['Обрыв соединения']);
      console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
  };

  socket.onmessage = function(event) {
    data = JSON.parse(event.data);

    if(data.errors !== undefined && data.errors.length != 0){
      showErrors($errorsDiv, data.errors);
      return;
    }

    fillUserProfile(data);
    console.log("Получены данные " + event.data);
  };

  socket.onerror = function(error) {
    showErrors($errorsDiv, [error.message]);
    console.log("Ошибка " + error.message);
  };

  return socket;
}
