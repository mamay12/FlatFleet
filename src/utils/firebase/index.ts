import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1HuoVPc64cT-i8b5nadJKGZsfikqFVMM",
    authDomain: "flatfleet-69b5b.firebaseapp.com",
    databaseURL: "https://flatfleet-69b5b-default-rtdb.firebaseio.com",
    projectId: "flatfleet-69b5b",
    storageBucket: "flatfleet-69b5b.firebasestorage.app",
    messagingSenderId: "369572666909",
    appId: "1:369572666909:web:ef704ac5aa7539a62330f4"
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase)
export const db = getFirestore(firebase);
export const googleProvider = new GoogleAuthProvider()

