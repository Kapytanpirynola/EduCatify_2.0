// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCceGIbkpG7ntlPcwL11cQ5u1aAEF2V-ME",
  authDomain: "educatify-8e4ca.firebaseapp.com",
  projectId: "educatify-8e4ca",
  storageBucket: "educatify-8e4ca.firebasestorage.app",
  messagingSenderId: "664713498743",
  appId: "1:664713498743:web:d5c0a70d9538583977b672"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);