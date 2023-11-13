import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,OAuthProvider,FacebookAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDmSd2H9FBD-gqUr_9-Nf0R4UXk6O2tDy0",
  authDomain: "docs-d5abc.firebaseapp.com",
  projectId: "docs-d5abc",
  storageBucket: "docs-d5abc.appspot.com",
  messagingSenderId: "1010996521024",
  appId: "1:1010996521024:web:925b4f3b9f87bdcec8d7a5",
  measurementId: "G-K7SQNZBPYQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gprovider = new GoogleAuthProvider();
export const aprovider = new OAuthProvider('apple.com');
export const fprovider = new FacebookAuthProvider();
export const dbStore = getFirestore(app);



