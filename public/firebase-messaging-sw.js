// public/firebase-messaging-sw.js

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBACAzGCbQ4GQJDf62XEIQniVRST3oZWQw",
  authDomain: "glc-notifications.firebaseapp.com",
  projectId: "glc-notifications",
  storageBucket: "glc-notifications.firebasestorage.app",
  messagingSenderId: "119590449854",
  appId: "1:119590449854:web:32da005e29011ce9b864ef"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png' // Using logo.png from public
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
