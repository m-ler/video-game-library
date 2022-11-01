import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import handlePromise from "../utils/handlePromise";
import { auth } from "./firebase";

export default async email => {
  const [response, error] = await handlePromise(sendPasswordResetEmail(auth, email));
  error && toast.error("We couldn't send a verification email. Please try again later.");
  return !error;
};
