// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBsmVVM35i2EEnu-V0L1Cg2JRtSQxLkseU",
  authDomain: "pixabay-18813.firebaseapp.com",
  projectId: "pixabay-18813",
  storageBucket: "pixabay-18813.appspot.com",
  messagingSenderId: "303649171276",
  appId: "1:303649171276:web:bc9f71f5037d83f3e991e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
