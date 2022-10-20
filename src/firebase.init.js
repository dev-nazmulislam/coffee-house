// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCbm5BsDOXVnVBIWtX5TkSwqLpaDMWFslo",
  authDomain: "coffee-ordering-app-94ae4.firebaseapp.com",
  projectId: "coffee-ordering-app-94ae4",
  storageBucket: "coffee-ordering-app-94ae4.appspot.com",
  messagingSenderId: "892706231827",
  appId: "1:892706231827:web:1e005baca2608fe2b011e6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
