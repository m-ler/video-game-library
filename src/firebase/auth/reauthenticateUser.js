import { reauthenticateWithCredential } from "firebase/auth";
import handlePromise from "../../utils/handlePromise";
import { auth } from "../firebase";

const errorMessages = {
  "auth/wrong-password": "Your password was incorrect. Please double-check your password.",
  "default": "There was an error on the server. Please try again later.",
};

export default async credential => {
  let errorMessage = "";
  const [response, error] = await handlePromise(reauthenticateWithCredential(auth.currentUser, credential));
  if (!!error) {
    errorMessage = errorMessages[error.code] || errorMessages["default"];
  }

  return [!!response, errorMessage];
};
