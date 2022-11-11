import { initializeApp } from "firebase/app";

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
export { app };
