import { signOut } from "firebase/auth";
import handlePromise from "../utils/handlePromise";
import { auth } from "./firebase";

export default async () => {
  const [response, error] = await handlePromise(signOut(auth));
  !!error && console.error(error);
  return !error;
};
