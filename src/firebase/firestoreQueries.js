import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const emailExists = async email => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const response = await getDocs(q);
  return !response.empty;
};

export const usernameExists = async username => {
  const q = query(collection(db, "users"), where("nickname", "==", username));
  const response = await getDocs(q);
  return !response.empty;
};
