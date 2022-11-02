import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

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

export const getUserDocumentById = async id => {
  const userRef = doc(db, "users", id);
  const document = await getDoc(userRef);
  const data = document?.data() || null;
  return data;
};

export const getUserDocumentByEmail = async email => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const response = await getDocs(q);
  return (response?.docs || [])[0] || null;
};
