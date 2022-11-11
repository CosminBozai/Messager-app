import { app } from "./firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);

export { storage, ref, uploadBytes };
