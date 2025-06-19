// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv8PdE3F02MOojcobSt0M7HeJvFuPANws",
  authDomain: "mern-stack-92a32.firebaseapp.com",
  databaseURL: "https://mern-stack-92a32-default-rtdb.firebaseio.com",
  projectId: "mern-stack-92a32",
  storageBucket: "mern-stack-92a32.firebasestorage.app",
  messagingSenderId: "806882659930",
  appId: "1:806882659930:web:958d5a81e06a7ff25c5263",
  measurementId: "G-FHL6YZQL4Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);