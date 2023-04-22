import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLWk-zX1diAbu66ZdQ4SoH_zYqx46iPTU",
  authDomain: "chat-react-58dbc.firebaseapp.com",
  projectId: "chat-react-58dbc",
  storageBucket: "chat-react-58dbc.appspot.com",
  messagingSenderId: "389568266516",
  appId: "1:389568266516:web:e007514c47fa60fca38201",
  measurementId: "G-TRMECTKSC7"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
