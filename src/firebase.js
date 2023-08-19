// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRSYU4me7u5c29I8AIWEGtGsOBejWZNl0",
    authDomain: "react-chat-6c473.firebaseapp.com",
    projectId: "react-chat-6c473",
    storageBucket: "react-chat-6c473.appspot.com",
    messagingSenderId: "924672541679",
    appId: "1:924672541679:web:5266dfc0f806fe1f5c6c1a",
    measurementId: "G-4ZLWL14T01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);