import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCChYOr1g5V2RhkwIYNmrirFs35at8WJV4",
  authDomain: "accesibilidad-1d3c0.firebaseapp.com",
  projectId: "accesibilidad-1d3c0",
  storageBucket: "accesibilidad-1d3c0.firebasestorage.app",
  messagingSenderId: "611703827062",
  appId: "1:611703827062:web:97b3d571524036f6c14d57",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;