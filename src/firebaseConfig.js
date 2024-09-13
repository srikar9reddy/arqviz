// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // Add this line

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY, // Correctly referring to .env variables
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, // Correctly referring to .env variables
  projectId: process.env.REACT_APP_PROJECT_ID, // Correctly referring to .env variables
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // Correctly referring to .env variables
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, // Correctly referring to .env variables
  appId: process.env.REACT_APP_APP_ID // Correctly referring to .env variables
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
