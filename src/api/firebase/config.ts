import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAIb7p4xmmlK1jI9Hoz0tXjDTHa0oRGfqU",
  authDomain: "luxuryhotels-96bd6.firebaseapp.com",
  projectId: "luxuryhotels-96bd6",
  storageBucket: "luxuryhotels-96bd6.firebasestorage.app",
  messagingSenderId: "333137289489",
  appId: "1:333137289489:web:0e693989de2f74aa9f6cb0",
};

export const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(firebaseApp);
