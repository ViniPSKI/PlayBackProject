import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCYKIIGoryepaZVUuZ2qAyBwNIaTLIrH5E",
  authDomain: "trabalhomobileutfpr.firebaseapp.com",
  projectId: "trabalhomobileutfpr",
  storageBucket: "trabalhomobileutfpr.firebasestorage.app",
  messagingSenderId: "908926901148",
  appId: "1:908926901148:web:1c3c3ad7d88dea541e4659"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const database = getDatabase(firebaseApp);

export { auth, database };