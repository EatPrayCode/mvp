import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  PhoneAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  updateProfile,
  Auth,
} from 'firebase/auth';
import firebase from './firebase';
import { CustomWindow } from './../../typings';
declare let window: CustomWindow;

export const auth: Auth = getAuth(firebase);

export const currentUser = () => {
  return onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
};

export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const signInWithFacebook = () =>
  signInWithPopup(auth, new FacebookAuthProvider());

export const signInAnonymous = () => signInAnonymously(auth);

export const logOut = () => signOut(auth);

