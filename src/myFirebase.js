import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfcRk1pQYzTR2pXOMr_6YXuz5Zh90lOlQ",
  authDomain: "nwitter-49187.firebaseapp.com",
  projectId: "nwitter-49187",
  storageBucket: "nwitter-49187.appspot.com",
  messagingSenderId: "268823214484",
  appId: "1:268823214484:web:4d8c161825407b31ea7781"
};
initializeApp(firebaseConfig);
export const authService = getAuth();
export const db = getFirestore();
