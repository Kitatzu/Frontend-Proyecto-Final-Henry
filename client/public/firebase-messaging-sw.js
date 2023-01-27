importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
importScripts("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");

const firebaseConfig = {
  apiKey: "AIzaSyBw99NjiG8hXqSAGPaVYUEEAYeuK6wpBZ0",
  authDomain: "boxtech-26e5f.firebaseapp.com",
  projectId: "boxtech-26e5f",
  storageBucket: "boxtech-26e5f.appspot.com",
  messagingSenderId: "937446000913",
  appId: "1:937446000913:web:4c494be8e8e9c5b694a4b0",
  measurementId: "G-VDDM24RNKW",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  // axios
  //   .get("https://boxtech-production.up.railway.app/categories")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://boxtech-production.up.railway.app/categories");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = xhr.response;
      console.log(data);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
