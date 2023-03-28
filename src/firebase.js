// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsVlng-JMTu3hIkea2-2jQa-6H1dEA0_4",
  authDomain: "ccs-panel.firebaseapp.com",
  databaseURL: "https://ccs-panel-default-rtdb.firebaseio.com",
  projectId: "ccs-panel",
  storageBucket: "ccs-panel.appspot.com",
  messagingSenderId: "87670949063",
  appId: "1:87670949063:web:d50590a72e7ae4945b2ae2",
  measurementId: "G-XMHXVQFTWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: e.message };
  }
}

export async function addDocumentWithDocId(collectionName, data, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapShot = await getDoc(docRef);

    if (docSnapShot.exists()) {
      console.log("document already exist");
      throw new Error(`document already exist with this ${docId}`);
      return;
    }

    await setDoc(docRef, data);
    console.log("document added successfully.");
    return { success: true, docId: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: e.message };
  }
}

export async function SignIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { success: true, user: userCredential.user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { success: false, error: errorMessage };
  }
}
