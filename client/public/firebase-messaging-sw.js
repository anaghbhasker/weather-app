// // Import Firebase scripts
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing in the messagingSenderId
// firebase.initializeApp({
//   apiKey: "AIzaSyBnAtYB5fkw85S5yW4sIwHUMVg2DNmIc9A",
//   authDomain: "weather-app-8070e.firebaseapp.com",
//   projectId: "weather-app-8070e",
//   storageBucket: "weather-app-8070e.appspot.com",
//   messagingSenderId: "1030395840360",
//   appId: "1:1030395840360:web:4b8d27292fb2a71a4d38dd",
//   measurementId: "G-JSCT29NCB3",
// });

// const messaging = firebase.messaging();

//firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

var firebaseConfig = {
  apiKey: "AIzaSyBnAtYB5fkw85S5yW4sIwHUMVg2DNmIc9A",
  authDomain: "weather-app-8070e.firebaseapp.com",
  projectId: "weather-app-8070e",
  storageBucket: "weather-app-8070e.appspot.com",
  messagingSenderId: "1030395840360",
  appId: "1:1030395840360:web:4b8d27292fb2a71a4d38dd",
  measurementId: "G-JSCT29NCB3",
}

const app = firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


