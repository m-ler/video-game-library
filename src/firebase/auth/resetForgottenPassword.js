import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import handlePromise from "../../utils/handlePromise";
import { auth, db } from "../firebase";
import { getUserDocumentByEmail } from "../fireStore/firestoreQueries";

const updateUserDocumentPassword = async (email, newPassword) => {
  const uid = (await getUserDocumentByEmail(email))?.id;
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { password: newPassword }, { merge: true });
};

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

  !!verfiyResponse && (await updateUserDocumentPassword(verfiyResponse, newPassword));

  toast.success("Password updated successfully.");
  return true;
};
