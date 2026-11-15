import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAC11S96VktYNmWQPWnUOTfh2JvHHYd-iM",
  authDomain: "mahesh-furniture-9da03.firebaseapp.com",
  projectId: "mahesh-furniture-9da03",
  storageBucket: "mahesh-furniture-9da03.firebasestorage.app",
  messagingSenderId: "101400093751",
  appId: "1:101400093751:web:7bf3636198c9782fc68bb2",
  measurementId: "G-67F3J21BP8"
};

// Initialize Firebase safely for Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Optional analytics setup
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}