import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firestore = getFirestore(app);

export { firestore, collection, doc, addDoc, setDoc, getDoc, updateDoc };
