// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEQWP8OzGCPAHjg94XJIAIn43IRuLRhGI",
    authDomain: "react-chat-c8cb7.firebaseapp.com",
    projectId: "react-chat-c8cb7",
    storageBucket: "react-chat-c8cb7.appspot.com",
    messagingSenderId: "680154243364",
    appId: "1:680154243364:web:d8f4ced0a3aee3b6b353b1",
    measurementId: "G-ZYG1ZVF9H6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);