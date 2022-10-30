import { signInWithEmailAndPassword } from "firebase/auth";
import handlePromise from "../utils/handlePromise";
import { auth } from "./firebase";

const errorMessages = {
  "auth/user-not-found": "The email you entered doesn't belong to an account.",
  "auth/wrong-password": "Your password was incorrect. Please double-check your password.",
  "auth/too-many-requests": "Access to this account has been temporarily disabled due to many failed login attempts.",
  "default": "There was an error on the server. Please try again later.",
};

export default async (email, password) => {
  let errorMessage = "";
  const [userCredential, error] = await handlePromise(signInWithEmailAndPassword(auth, email, password));
  if (!!error) {
    errorMessage = errorMessages[error.code] || errorMessages["default"];
  }

  return [!!userCredential, errorMessage];
};
