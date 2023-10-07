import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBbHNtIPVDm0nSN4-Z9FDqxPsf-_5ck6VY",
    authDomain: "react-login-f1133.firebaseapp.com",
    projectId: "react-login-f1133",
    storageBucket: "react-login-f1133.appspot.com",
    messagingSenderId: "537333812639",
    appId: "1:537333812639:web:f1b406faa70cf2cddf41aa",
    measurementId: "G-C19JM6T3PM"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
