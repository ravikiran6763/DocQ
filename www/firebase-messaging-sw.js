importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');


var config = {
  apiKey: "AIzaSyBPldeHuqE5O3GGqS2jWIkR5s8JKNnfxDE",
  authDomain: "doctorquick-158607.firebaseapp.com",
  databaseURL: "https://doctorquick-158607.firebaseio.com",
  storageBucket: "doctorquick-158607.appspot.com",
  messagingSenderId: "271054721857"
};
console.log(config);
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
console.log('Notification permission granted.');

return messaging.getToken();
})
.then(function(token){
  console.log(token);
})
.catch(function(err) {
console.log('Unable to get permission to notify.', err);
});

messaging.onMessage(function(payload){
  console.log('onMessage',payload);
});
