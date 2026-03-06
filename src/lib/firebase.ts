import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsEPQS6uzXvkBuysvcO2qdf0g92h7Z3TI",
    authDomain: "coder-shetkari.firebaseapp.com",
    projectId: "coder-shetkari",
    storageBucket: "coder-shetkari.firebasestorage.app",
    messagingSenderId: "86869268888",
    appId: "1:86869268888:web:218e69bb41643cd9a173ed",
    measurementId: "G-V7M24RGGQX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
