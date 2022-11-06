import { storage } from "./../firebase";
import { ref, uploadBytes } from "firebase/storage";
import handlePromise from "../../utils/handlePromise";

export default async (file, refPath) => {
  const storageRef = ref(storage, refPath);
  const [response, error] = await handlePromise(uploadBytes(storageRef, file));
  return [response, error];
};
