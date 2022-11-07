import { useRef } from "react";
import { useState } from "react";
import SpinnerC from "../../components/loading-animations/SpinnerC";
import { RiLockPasswordFill } from "react-icons/ri";
import FormInput from "../../components/forms/FormInput";
import { MdError } from "react-icons/md";
import deleteUser from "../../firebase/auth/deleteUser";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import reauthenticateUser from "../../firebase/auth/reauthenticateUser";
import { useNavigate } from "react-router-dom";
import signOut from "../../firebase/auth/signOut";

const validatePassword = value => {};

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const passwordRef = useRef();

  const deleteAccount = async e => {
    e.preventDefault();
    setDeleteErrorMessage("");
    setDeletingAccount(true);

    const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordRef.current.value);
    const [authResponse, authError] = await reauthenticateUser(credential);
    setDeleteErrorMessage(authError || "");
    if (!authResponse) {
      setDeletingAccount(false);
      return;
    }

    const deleted = await deleteUser();
    if (!deleted) return;

    (await signOut()) && navigate("/login");
  };

  const onInputChange = (inputElement, isValid) => {
    setFormComplete(isValid);
  };

  return (
    <form className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]" onSubmit={deleteAccount}>
      <FormInput
        id="password-confirmation"
        label="Confirm password"
        type="password"
        icon={<RiLockPasswordFill></RiLockPasswordFill>}
        validate={validatePassword}
        ref={passwordRef}
        onChange={onInputChange}
      ></FormInput>

      {!!deleteErrorMessage && (
        <div className="animate-[shake_0.3s_linear]">
          <MdError className="inline text-error min-w-[14px] mr-[5px]" size={"14px"}></MdError>
          <span className="text-[13px] font-Roboto font-medium text-error ">{deleteErrorMessage}</span>
        </div>
      )}

      <button
        onClick={deleteAccount}
        className={`relative group  ml-auto mt-[15px] px-[16px] py-[6px] rounded duration-200 
         ${deletingAccount ? "pointer-events-none" : ""} ${formComplete ? "bg-accent1 hover:bg-accent2" : "bg-neu1-5/50"}`}
      >
        <span className={`text-[16px] text-neu1-1 font-Raleway font-bold group-invalid:opacity-50 ${deletingAccount ? "invisible" : ""}`}>
          Delete
        </span>
        {deletingAccount && <SpinnerC width={30} height={30} className="absolute top-0 left-0 w-full h-full"></SpinnerC>}
      </button>
    </form>
  );
};

export default DeleteAccountForm;
