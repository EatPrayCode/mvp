import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: `AIzaSyAWINeiLMIuveUut24_O_049L43LEOoyfQ`,
  authDomain: `testproject-c86d2.firebaseapp.com`,
  projectId: `testproject-c86d2`,
  storageBucket: `testproject-c86d2.appspot.com`,
  messagingSenderId: `335386747115`,
  appId: `1:335386747115:web:6a1796628a15516efa9eae`,
  measurementId: `G-DJF504K07M`,
}

// initialize the app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth, }
