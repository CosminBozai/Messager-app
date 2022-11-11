import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firestore = getFirestore(app);

export { firestore, collection, doc, addDoc, setDoc, getDoc };
