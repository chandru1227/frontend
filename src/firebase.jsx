// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = { 
    apiKey: "AIzaSyC_8-5Gi233pCVTPtHAqOmunAdOfGnoE4s", 
    authDomain: "socialmedia-c46c0.firebaseapp.com", 
    projectId: "socialmedia-c46c0", 
    storageBucket: "socialmedia-c46c0.appspot.com", 
    messagingSenderId: "997684877305", 
    appId: "1:997684877305:web:1f314084a6cfe65be24f28", 
    measurementId: "G-WS2S2S12N5" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
