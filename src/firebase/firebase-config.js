import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCwf5pIyszaV4_fYwsgtwlpfxiUduMIdEA",
  authDomain: "video-game-library-ad0f3.firebaseapp.com",
  projectId: "video-game-library-ad0f3",
  storageBucket: "video-game-library-ad0f3.appspot.com",
  messagingSenderId: "8856154863",
  appId: "1:8856154863:web:7937cfce3d652c2bb0a11a",
  measurementId: "G-HS3MYGZYBX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
