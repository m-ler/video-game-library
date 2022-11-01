import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { toast } from "react-toastify";
import handlePromise from "../utils/handlePromise";
import { auth } from "./firebase";

export default async (actionCode, newPassword) => {
  const [verfiyResponse, verfifyError] = await handlePromise(verifyPasswordResetCode(auth, actionCode));
  if (verfifyError) {
    toast.error("Link is expired or invalid. Please try resetting the password with a new link.");
    return false;
  }

  const [confirmResponse, confirmError] = await handlePromise(confirmPasswordReset(auth, actionCode, newPassword));
  if (confirmError) {
    toast.error("An error occurred. Please try resetting the password with a new link.");
    return false;
  }

  toast.success("Password updated successfully.");
  return true;
};
