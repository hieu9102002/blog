import {initializeApp, getApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAN_D_sFO_GTeDIZ9a6H6A7RMQvcZpTTpA",
    authDomain: "blog-8224c.firebaseapp.com",
    projectId: "blog-8224c",
    storageBucket: "blog-8224c.appspot.com",
    messagingSenderId: "203527742641",
    appId: "1:203527742641:web:c85a3a948f21dafbccee90"
};

if (!getApp.length){
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();

