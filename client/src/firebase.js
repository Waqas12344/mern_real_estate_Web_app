// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fa18c.firebaseapp.com",
  projectId: "mern-estate-fa18c",
  storageBucket: "mern-estate-fa18c.appspot.com",
  messagingSenderId: "467719329882",
  appId: "1:467719329882:web:4591e08777310806f82063"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);