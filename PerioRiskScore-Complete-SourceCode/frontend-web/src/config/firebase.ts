import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyPerioRisk2026Production123",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "periorisk-score.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "periorisk-score",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "periorisk-score.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "987654321012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:987654321012:web:a1b2c3d4e5f6a7b8c9d0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
