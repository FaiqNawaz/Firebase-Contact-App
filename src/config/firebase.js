// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbo_4vN5a3pVNQ0J5kGZ3FypzSAkf4Ljc",
  authDomain: "contact-vite-82a26.firebaseapp.com",
  projectId: "contact-vite-82a26",
  storageBucket: "contact-vite-82a26.appspot.com",
  messagingSenderId: "798959520062",
  appId: "1:798959520062:web:2d49a91b6fc2d29c8e046f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);