import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCYKIIGoryepaZVUuZ2qAyBwNIaTLIrH5E",
  authDomain: "trabalhomobileutfpr.firebaseapp.com",
  projectId: "trabalhomobileutfpr",
  storageBucket: "trabalhomobileutfpr.firebasestorage.app",
  messagingSenderId: "908926901148",
  appId: "1:908926901148:web:1c3c3ad7d88dea541e4659"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database };
