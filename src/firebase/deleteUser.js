import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import handlePromise from "../utils/handlePromise";
import { auth, db } from "./firebase";

const deleteUserDocument = async userID => {
  const [response, error] = await handlePromise(deleteDoc(doc(db, "users", userID)));
  error && console.error(error);

  return !error;
};

export default async () => {
  const userID = auth.currentUser.uid;
  const [response, error] = await handlePromise(deleteUser(auth.currentUser));
  error && console.error(error);
  !error && (await deleteUserDocument(userID));

  !error && toast.warn("Account has been permanently deleted", { autoClose: 5000 });

  return !error;
};
