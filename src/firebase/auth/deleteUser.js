import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import { toast } from "react-toastify";
import handlePromise from "../../utils/handlePromise";
import { auth, db, storage } from "../firebase";

const deleteUserDocument = async userID => {
  const [response, error] = await handlePromise(deleteDoc(doc(db, "users", userID)));
  error && console.error(error);
  return !error;
};

const deleteUserMedia = async userDisplayName => {
  const listRef = ref(storage, `users/avatars/${userDisplayName}`);
  const listResults = await listAll(listRef);

  const deletePromises = listResults.items.map(item => deleteObject(item));
  await Promise.all(deletePromises);
};

export default async () => {
  const user = auth.currentUser;
  const [response, error] = await handlePromise(deleteUser(auth.currentUser));
  error && console.error(error);
  if (!error) {
    await deleteUserDocument(user.uid);
    await deleteUserMedia(user.displayName);
    toast.warn("Account has been permanently deleted", { autoClose: 5000 });
  }

  return !error;
};
