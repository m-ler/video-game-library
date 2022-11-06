import { updateCurrentUser, updateProfile } from "firebase/auth";
import handlePromise from "../../utils/handlePromise";
import { auth } from "../firebase";

export default async data => {
  const [response, error] = await handlePromise(updateProfile(auth.currentUser, data));
  !error && (await updateCurrentUser(auth, auth.currentUser));
  return !error;
};
