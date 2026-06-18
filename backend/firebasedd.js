import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZeFvil4_4fGRBnbKqp-TLn33mg9iZLOA",
  authDomain: "origniality.firebaseapp.com",
  projectId: "origniality",
  storageBucket: "origniality.firebasestorage.app",
  messagingSenderId: "448826500418",
  appId: "1:448826500418:web:be931b0a450f540ccd94db",
  measurementId: "G-NS86B9QVR7"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const docRef = doc(db, "startupcollection", "0");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
