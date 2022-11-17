import { app } from "./firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL, uploadString };
