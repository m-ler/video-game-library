import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import handlePromise from "../utils/handlePromise";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const createUserDocument = async (uid, email, nickname, password) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    email,
    nickname,
    password,
  });
};

const saveDisplayName = async username => {
  const userProfile = {
    displayName: username,
  };

  const [response, error] = await handlePromise(updateProfile(auth.currentUser, userProfile));
  error && console.log(error);
};

/**
 * @param {Object} data - User data object.
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.username
 */
export default async data => {
  const [userCredential, error] = await handlePromise(createUserWithEmailAndPassword(auth, data.email, data.password));
  error && console.error(error);
  if (!!userCredential) {
    await saveDisplayName(data.username);
    await createUserDocument(userCredential.user.uid, data.email, data.username, data.password);
  }
  return userCredential;
};
