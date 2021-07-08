/*
 * File: firebase-messaging-sw.js                                              *
 * Project: church-project                                                     *
 * Created Date: Monday, June 28th 2021, 4:51:11 pm                            *
 * -----                                                                       *
 * Last Modified: Tuesday, June 29th 2021 12:55:06 pm                          *
 */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBTjxKJ_mV1ozeehpFm04KR2SN1-C5i2-A",
  authDomain: "church-react-project.firebaseapp.com",
  projectId: "church-react-project",
  storageBucket: "church-react-project.appspot.com",
  messagingSenderId: "635945888316",
  appId: "1:635945888316:web:439b4b02461435aca0f139",
  measurementId: "G-639MJ2FSMG",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // ...
});

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/vercel.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
