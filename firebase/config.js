// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc, deleteDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // you can get these from firebase
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const SHOPLIST = 'SHOPLIST'

export {
    firestore,
    SHOPLIST,
    addDoc,
    collection,
    query,
    onSnapshot,
    orderBy,
    serverTimestamp,
    doc,
    deleteDoc

}