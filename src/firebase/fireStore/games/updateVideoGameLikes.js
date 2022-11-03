import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async (gameID, userID, add) => {
  const docRef = doc(db, "videogames", gameID.toString());

  await updateDoc(docRef, {
    likes: add ? arrayUnion(userID) : arrayRemove(userID),
  });
};
