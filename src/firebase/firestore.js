import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

const firestore = getFirestore(app);

export {
  firestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
  arrayUnion,
  onSnapshot,
};
