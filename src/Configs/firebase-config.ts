// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm69eNQxtYB-lG3_0g3KgoAvyKR_5JHPw",
  authDomain: "safeprod-70c32.firebaseapp.com",
  projectId: "safeprod-70c32",
  storageBucket: "safeprod-70c32.appspot.com",
  messagingSenderId: "98952780747",
  appId: "1:98952780747:web:7743a777920baa5372344e",
  measurementId: "G-P8HQMQG48K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const Auth = getAuth(app);

export const storage = getStorage();
