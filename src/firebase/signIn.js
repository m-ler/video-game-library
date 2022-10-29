import { signInWithEmailAndPassword } from "firebase/auth";
import handlePromise from "../utils/handlePromise";
import { auth } from "./firebase";

export default async (email, password) => {
  const [userCredential, error] = await handlePromise(signInWithEmailAndPassword(auth, email, password));
  error && console.error(error);
  return userCredential;
};
