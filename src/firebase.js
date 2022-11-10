import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPNXff-fw9QklJjOOm0uJyC2Wt9Ol-iZU",
  authDomain: "messager-app-c6790.firebaseapp.com",
  projectId: "messager-app-c6790",
  storageBucket: "messager-app-c6790.appspot.com",
  messagingSenderId: "17673740631",
  appId: "1:17673740631:web:83fd9d14cd81378db3de12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  collection,
  doc,
  addDoc,
  setDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
