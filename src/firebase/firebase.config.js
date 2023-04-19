// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCARRXKeGai5lEgQKsAmfKKmizx32xKJx0",
  authDomain: "email-pass-social-auth.firebaseapp.com",
  projectId: "email-pass-social-auth",
  storageBucket: "email-pass-social-auth.appspot.com",
  messagingSenderId: "767178407496",
  appId: "1:767178407496:web:c14db99c12d718b898a27d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
