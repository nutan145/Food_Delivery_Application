// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfck2qfwyhtvq2pJG2E1SgisbB83gTuJY",
  authDomain: "food-delivery-applicatio-a34a6.firebaseapp.com",
  projectId: "food-delivery-applicatio-a34a6",
  storageBucket: "food-delivery-applicatio-a34a6.firebasestorage.app",
  messagingSenderId: "942778139661",
  appId: "1:942778139661:web:3e07d7e5532939d1848144",
  measurementId: "G-S2BHB78X0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);