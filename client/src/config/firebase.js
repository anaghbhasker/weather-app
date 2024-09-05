import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBnAtYB5fkw85S5yW4sIwHUMVg2DNmIc9A",
  authDomain: "weather-app-8070e.firebaseapp.com",
  projectId: "weather-app-8070e",
  storageBucket: "weather-app-8070e.appspot.com",
  messagingSenderId: "1030395840360",
  appId: "1:1030395840360:web:4b8d27292fb2a71a4d38dd",
  measurementId: "G-JSCT29NCB3",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Received message:", payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
      };
      new Notification(notificationTitle, notificationOptions);
      resolve(payload);
    });
  });



// For testing purposes, you can listen for incoming messages
onMessageListener().then((payload) => {
  console.log("Message received in the foreground:", payload);
});

export { messaging, getToken, onMessage };
