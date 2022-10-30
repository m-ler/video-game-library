import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwf5pIyszaV4_fYwsgtwlpfxiUduMIdEA",
  authDomain: "video-game-library-ad0f3.firebaseapp.com",
  projectId: "video-game-library-ad0f3",
  storageBucket: "video-game-library-ad0f3.appspot.com",
  messagingSenderId: "8856154863",
  appId: "1:8856154863:web:7937cfce3d652c2bb0a11a",
  measurementId: "G-HS3MYGZYBX",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
