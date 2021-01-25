importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js");

var firebaseConfig = {
     apiKey: "AIzaSyARHHB-FoushRc9e5QpRY7GN2AXm5LTLPs",
     authDomain: "big-data-2c769.firebaseapp.com",
     projectId: "big-data-2c769",
     storageBucket: "big-data-2c769.appspot.com",
     messagingSenderId: "795371611125",
     appId: "1:795371611125:web:d850e8f8c94be55be276bc",
     measurementId: "G-636Z1SSCYW"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});