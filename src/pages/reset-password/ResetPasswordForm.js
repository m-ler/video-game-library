import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { useState } from "react";
import { useRef } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import SpinnerC from "../../components/elements/loading-animations/SpinnerC";
import FormInput from "../../components/forms/FormInput";
import resetForgottenPassword from "../../firebase/auth/resetForgottenPassword";

const validatePassword = value => {
  if (value.length < 6) return "Password must contain at least 6 characters.";
};

const ResetPasswordForm = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = searchParams.get("mode");
  const actionCode = searchParams.get("oobCode");

  const [resettingPassword, setResettingPassword] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const passwordRef = useRef();

  const onInputChange = (inputElement, isValid) => {
    setFormComplete(isValid);
  };

  const resetPassword = async e => {
    e.preventDefault();
    if (!formComplete || resettingPassword) return;

    setResettingPassword(true);
    const passwordUpdatedSuccessfully = await resetForgottenPassword(actionCode, passwordRef.current.value);
    setResettingPassword(false);
    passwordUpdatedSuccessfully && navigate("/login");
  };

  return (
    <form className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]" onSubmit={resetPassword}>
      <FormInput
        id="new-password"
        label="New password"
        type="password"
        icon={<RiLockPasswordFill></RiLockPasswordFill>}
        validate={validatePassword}
        ref={passwordRef}
        onChange={onInputChange}
      ></FormInput>

      <button
        onClick={resetPassword}
        className={`relative group  ml-auto mt-[15px] px-[16px] py-[6px] rounded duration-200 
         ${resettingPassword ? "pointer-events-none" : ""} ${formComplete ? "bg-accent1 hover:bg-accent2" : "bg-neu1-5/50"}`}
      >
        <span className={`text-[16px] text-neu1-1 font-Raleway font-bold group-invalid:opacity-50 ${resettingPassword ? "invisible" : ""}`}>
          Reset
        </span>
        {resettingPassword && <SpinnerC width={30} height={30} className="absolute top-0 left-0 w-full h-full"></SpinnerC>}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
