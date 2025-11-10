import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC0AFz0EzPeZRtTudy_N13buZcm8zyOofY",
  authDomain: "subscriptions-83ee4.firebaseapp.com",
  projectId: "subscriptions-83ee4",
  storageBucket: "subscriptions-83ee4.firebasestorage.app",
  messagingSenderId: "415931120733",
  appId: "1:415931120733:web:b033bc51e6993afdf561b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
