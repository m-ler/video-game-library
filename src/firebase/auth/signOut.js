import { signOut } from "firebase/auth";
import handlePromise from "../../utils/handlePromise";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default async () => {
  const [response, error] = await handlePromise(signOut(auth));
  !!error && console.error(error);
  !error && toast("Goodbye 👋", { autoClose: 1500 });

  return !error;
};
