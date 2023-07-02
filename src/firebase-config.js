import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBDmS8dXsfq4D4-FiHx6JldvG8SeXqOdQA',
    authDomain: 'iwindy-chat.firebaseapp.com',
    projectId: 'iwindy-chat',
    storageBucket: 'iwindy-chat.appspot.com',
    messagingSenderId: '643394916700',
    appId: '1:643394916700:web:b5c361907266f5328ff199',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
