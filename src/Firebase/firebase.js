import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZErW_ewvYg8MRlyKm6W4yBBW71j65Whc",
  authDomain: "accessories-eceea.firebaseapp.com",
  projectId: "accessories-eceea",
  storageBucket: "accessories-eceea.firebasestorage.app",
  messagingSenderId: "1035901432494",
  appId: "1:1035901432494:web:f60315ee8ec85923f9f33f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);