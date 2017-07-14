import showErrors from './showErrors.js';

export default function getUserInformationAjax(userId, callbacks){
  $.ajax({
    url: 'http://localhost:8008/user/' + userId,
    method: 'GET',
    dataType: 'json',
    crossDomain: true,
    success: function(data){
      if(data.errors !== undefined && data.errors.length != 0){
        showErrors($('#errors'), data.errors);
        return;
      }

      callbacks.forEach(function(callback){
        callback(data);
      });
      // fillUserProfile(data);
      // fillUserForm(data);
    },
    error: function(jqXHR, status){
      showErrors($('#errors'), ['Не удалось получить данные']);
    },
  });
}
