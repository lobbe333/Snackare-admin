import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClJwokIaPKVxrrHnpjknrIjzAU7aLwdco",
  authDomain: "snackare-6e460.firebaseapp.com",
  databaseURL: "https://snackare-6e460-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "snackare-6e460",
  storageBucket: "snackare-6e460.appspot.com",
  messagingSenderId: "762258191666",
  appId: "1:762258191666:web:a1de72c5fe0b46ab08d32b",
  measurementId: "G-KG3FFP9C8J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);