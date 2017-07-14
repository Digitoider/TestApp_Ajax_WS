import './init.js';
import './css/profile.css';
import CloseError from './js/closeError.js';
import createWebsocket from './js/ws.js';
import fillUserProfile from './js/fillUserProfile.js';
import showErrors from './js/showErrors.js';

var userId = 1;

var closeError = new CloseError();
closeError.update();

$('#saveButton').click(function(e){
  e.preventDefault();
  var errors = validate();
  $('#errors').empty();
  if(errors.length != 0){
    showErrors($('#errors'), errors);
    return;
  }
  var userdata = getFormData();
  userdata.method = 'update';
  console.log(userdata);
  updateUserWithAjax(userdata, $('#errors'));
  //turnOnUserUpdateWithWebSocket(userdata, $('#errors'));
});
function turnOnUserUpdateWithWebSocket(userdata, $errorsDiv){
  socket = createWebsocket($errorsDiv);
  socket.send(JSON.parse(userdata));
}



function updateUserWithAjax(userdata, $errorsDiv){
  $.ajax({
    url: 'http://localhost:8008/update/user/' + userId,
    method: 'POST',
    dataType: 'json',
    data: userdata,
    // contentType: 'application/json',
    crossDomain: true,
    success: function(data){
      if(data.errors !== undefined && data.errors.length != 0){
        showErrors($errorsDiv, data.errors);
        return;
      }

      fillUserProfile(data);
      //TODO empty all form fields
    },
    error: function(jqXHR, status){
      console.log("error status: " + status);
      showErrors($errorsDiv, ['Не удалось обновить данные']);
    },
  });
}
import getUserInformationAjax from './js/getUserInformationAjax.js';
getUserInformationAjax(userId, [fillUserProfile, fillUserForm]);
// $.ajax({
//   url: 'http://localhost:8008/user/' + userId,
//   method: 'GET',
//   dataType: 'json',
//   crossDomain: true,
//   success: function(data){
//     if(data.errors !== undefined && data.errors.length != 0){
//       showErrors($('#errors'), data.errors);
//       return;
//     }
//
//     fillUserProfile(data);
//     fillUserForm(data);
//   },
//   error: function(jqXHR, status){
//     showErrors($('#errors'), ['Не удалось получить данные']);
//   },
// });

function getFormData(){
  var userdata = {
    id: userId,
    lastName: $('input[name="lastName"]').val().trim(),
    firstName: $('input[name="firstName"]').val().trim(),
    middleName: $('input[name="middleName"]').val().trim(),
    age: $('input[name="age"]').val().trim(),
  };
  return userdata;
}

function fillUserForm(userdata){
  $('input[name="lastName"]').val(userdata.lastName);
  $('input[name="firstName"]').val(userdata.firstName);
  $('input[name="middleName"]').val(userdata.middleName);
  $('input[name="age"]').val(userdata.age);
}



import Validator from './js/validator.js';

function validateLastName(maxSymbolsAmount){
  var lastName = new Validator($('input[name="lastName"]').val());
  var errors = [];
  if(lastName.hasMoreSymbolsThan(maxSymbolsAmount)){
    errors.push(`Поле 'Фамилия' должно содержать менее ${maxSymbolsAmount} символов`);
  }
  if(lastName.isEmpty()){
    errors.push(`Поле 'Фамилия' не должно быть пустым`);
  }
  return errors;
}
function validateFirstName(maxSymbolsAmount){
  var firstName = new Validator($('input[name="firstName"]').val());
  var errors = [];

  if(firstName.hasMoreSymbolsThan(maxSymbolsAmount)){
    errors.push(`Поле 'Имя' должно содержать менее ${maxSymbolsAmount} символов`);
  }
  if(firstName.isEmpty()){
    errors.push(`Поле 'Имя' не должно быть пустым`);
  }

  return errors;
}
function validateMiddleName(maxSymbolsAmount){
  var middleName = new Validator($('input[name="middleName"]').val());
  var errors = [];

  if(middleName.hasMoreSymbolsThan(maxSymbolsAmount)){
    errors.push(`Поле 'Отчество' должно содержать менее ${maxSymbolsAmount} символов`);
  }
  if(middleName.isEmpty()){
    errors.push(`Поле 'Отчество' не должно быть пустым`);
  }

  return errors;
}
function validateAge(minAge, maxAge){
  var age = new Validator($('input[name="age"]').val());
  var errors = [];

  if(age.isEmpty()){
    errors.push(`Поле 'Возраст' не должно быть пустым`);
    return errors;
  }
  if(age.isNotNumber()){
    errors.push(`Поле 'Возраст' должно быть числовым`);
    return errors;
  }
  if(age.isLessThan(minAge)){
    errors.push(`Минимальный возраст ${minAge} лет`);
  }
  if(age.isMoreThan(maxAge)){
    errors.push(`Максимальный возраст ${maxAge} лет`);
  }

  return errors;
}
function validate(){
  var errors = [];
  var maxSymbolsAmount = 15;
  var minAge = 18, maxAge = 50;

  errors = errors.concat(validateLastName(maxSymbolsAmount));
  errors = errors.concat(validateFirstName(maxSymbolsAmount));
  errors = errors.concat(validateMiddleName(maxSymbolsAmount));
  errors = errors.concat(validateAge(minAge, maxAge));
  return errors;
}
