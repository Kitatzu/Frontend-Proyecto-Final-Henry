// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw99NjiG8hXqSAGPaVYUEEAYeuK6wpBZ0",
  authDomain: "boxtech-26e5f.firebaseapp.com",
  projectId: "boxtech-26e5f",
  storageBucket: "boxtech-26e5f.appspot.com",
  messagingSenderId: "937446000913",
  appId: "1:937446000913:web:4c494be8e8e9c5b694a4b0",
  measurementId: "G-VDDM24RNKW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const analytics = getAnalytics(app);
