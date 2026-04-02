import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKOquW6kIdB0hJInZXtEnQW_5mkAs1sho",
  authDomain: "argentgagnantgagnant.firebaseapp.com",
  projectId: "argentgagnantgagnant",
  storageBucket: "argentgagnantgagnant.firebasestorage.app",
  messagingSenderId: "154047587969",
  appId: "1:154047587969:web:2c5206bd715be276d00f80",
  measurementId: "G-36KZSFEJ2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
