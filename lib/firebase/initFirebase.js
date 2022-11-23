// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";

const clientCredentials = {
    apiKey: `AIzaSyAWINeiLMIuveUut24_O_049L43LEOoyfQ`,
    authDomain: `testproject-c86d2.firebaseapp.com`,
    projectId: `testproject-c86d2`,
    storageBucket: `testproject-c86d2.appspot.com`,
    messagingSenderId: `335386747115`,
    appId: `1:335386747115:web:6a1796628a15516efa9eae`,
    measurementId: `G-DJF504K07M`,
};

function initFirebase() {
    if (typeof window !== undefined) {
        initializeApp(clientCredentials);
        console.log("Firebase has been init successfully");
    }
}

const app = initializeApp(clientCredentials);

const db = getFirestore(app);

const realDB = getDatabase(app);

export { initFirebase, db, realDB };