// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoBbumej6NQM3HrLXp9GrvwJLAyFfJGVs",
  authDomain: "podcast-app-fa7fc.firebaseapp.com",
  projectId: "podcast-app-fa7fc",
  storageBucket: "podcast-app-fa7fc.appspot.com",
  messagingSenderId: "541779258388",
  appId: "1:541779258388:web:957ac51291045433f4cb01",
  measurementId: "G-1ZV94ZWSN3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };
