// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdoP-VnNsHhrjxli5I2epHyMJ0GtCFTYE",
  authDomain: "otp-patcare.firebaseapp.com",
  projectId: "otp-patcare",
  storageBucket: "otp-patcare.appspot.com",
  messagingSenderId: "894528876670",
  appId: "1:894528876670:web:1d3090eab980102e5a682f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
