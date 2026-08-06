import * as admin from 'firebase-admin';

let isFirebaseInitialized = false;

try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });
    isFirebaseInitialized = true;
    console.log('[Firebase] Admin SDK initialized successfully.');
  } else {
    console.log('[Firebase] Running in local decoupled mode with memory store fallback.');
  }
} catch (error) {
  console.warn('[Firebase] Warning initializing Firebase Admin SDK:', error);
}

export const db = isFirebaseInitialized ? admin.firestore() : null;
export const authAdmin = isFirebaseInitialized ? admin.auth() : null;
export const storageAdmin = isFirebaseInitialized ? admin.storage() : null;
export { isFirebaseInitialized };
