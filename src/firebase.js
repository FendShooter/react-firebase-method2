import { initializeApp } from 'firebase/app';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDaiBgznAMimMWNJQy3qOkQmcf2poF5YsQ',
  authDomain: 'react-firebase-auth-2a017.firebaseapp.com',
  projectId: 'react-firebase-auth-2a017',
  storageBucket: 'react-firebase-auth-2a017.appspot.com',
  messagingSenderId: '402296550770',
  appId: '1:402296550770:web:0bfdd4e54008ed1d0859eb',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
