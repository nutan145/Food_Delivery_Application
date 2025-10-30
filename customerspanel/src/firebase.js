// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWEIV2a1zf1oYbUZ6WKBuWJxDBvrn4gRI",
  authDomain: "food-delivery-customerspanel.firebaseapp.com",
  projectId: "food-delivery-customerspanel",
  storageBucket: "food-delivery-customerspanel.firebasestorage.app",
  messagingSenderId: "623389670468",
  appId: "1:623389670468:web:8209b16e1a56ef6b79d011",
  measurementId: "G-1V02SXFYH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);