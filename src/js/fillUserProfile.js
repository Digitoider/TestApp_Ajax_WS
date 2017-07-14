export default function fillUserProfile(userdata){
  $('#profileLastName').text(userdata.lastName).fadeIn();
  $('#profileFirstName').text(userdata.firstName).fadeIn();
  $('#profileMiddleName').text(userdata.middleName).fadeIn();
  $('#profileBalance').text(userdata.currency + userdata.balance).fadeIn();
}
