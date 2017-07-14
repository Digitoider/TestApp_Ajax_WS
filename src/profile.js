import './init.js';
import './css/profile.css';
import getUserInformationAjax from './js/getUserInformationAjax.js';
import createWebsocket from './js/ws.js';
import fillUserProfile from './js/fillUserProfile.js';

//var socket = createWebsocket($('errors'));
var userId = 1;
getUserInformationAjax(userId, [fillUserProfile])
