import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import handlePromise from "../../../utils/handlePromise";
import { db } from "../../firebase";

export default async (uid, gameID, add) => {
  const docRef = doc(db, "users", uid);
  const [response, error] = await handlePromise(updateDoc(docRef, { likes: add ? arrayUnion(gameID) : arrayRemove(gameID) }));
  return !error;
};
