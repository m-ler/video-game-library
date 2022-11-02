import { doc, setDoc } from "firebase/firestore";
import handlePromise from "../../../utils/handlePromise";
import { db } from "../../firebase";

export default async (uid, likesArray) => {
  const docRef = doc(db, "users", uid);
  const [response, error] = await handlePromise(setDoc(docRef, { likes: likesArray }, { merge: true }));
  return !error;
};
