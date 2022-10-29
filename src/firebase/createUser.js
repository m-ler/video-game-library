import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import handlePromise from "../utils/handlePromise";
import { auth } from "./firebase";

const setUsername = async username => {
  const userProfile = {
    displayName: username,
  };
  
  console.log("called setUsername");
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
  !!userCredential && await setUsername(data.username);
  return userCredential;
};
