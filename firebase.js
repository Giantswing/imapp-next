//THIS FILE IS FOR ACCESSING FIREBASE SERVICES IN THE FRONTEND

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgJYKXYK3GH1bFEP2GvD7DqY3ufU-jhvI",
  authDomain: "imapp-cfdd0.firebaseapp.com",
  databaseURL:
    "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imapp-cfdd0",
  storageBucket: "imapp-cfdd0.appspot.com",
  messagingSenderId: "12400912825",
  appId: "1:12400912825:web:06e0728a69fdeae9b1ae68",
  measurementId: "G-G3FFGHC0DL",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
