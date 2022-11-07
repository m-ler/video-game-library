import { useRef } from "react";
import { useState } from "react";
import { MdCheckCircle, MdEmail } from "react-icons/md";
import SpinnerC from "../../components/loading-animations/SpinnerC";
import FormInput from "../../components/forms/FormInput";
import { emailExists } from "../../firebase/fireStore/firestoreQueries";
import sendPassResetEmail from "../../firebase/auth/sendPassResetEmail";
import regularExpressions from "../../utils/regularExpressions";

const validateEmail = async value => {
  if (!regularExpressions.validEmail.test(value)) return "Invalid email.";
  if (!(await emailExists(value))) return "That email does not belong to any account.";
};

const RecoverPasswordForm = () => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const emailRef = useRef();

  const onInputChange = (inputElement, isValid) => {
    setEmailSent(false);
    setFormComplete(isValid);
  };

  const sendRecoveryEmail = async e => {
    e.preventDefault();
    if (sendingEmail || !formComplete) return;
    setEmailSent(false);
    setSendingEmail(true);
    const emailSentSuccessfully = await sendPassResetEmail(emailRef.current.value);
    setSendingEmail(false);
    setEmailSent(emailSentSuccessfully);
  };

  return (
    <form className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]" onSubmit={sendRecoveryEmail}>
      <FormInput
        id="pass-recovery-email"
        label="Email"
        type="text"
        icon={<MdEmail></MdEmail>}
        validate={validateEmail}
        ref={emailRef}
        onChange={onInputChange}
      ></FormInput>

      {emailSent && (
        <div>
          <MdCheckCircle className="inline text-accent1 min-w-[14px] mr-[5px]" size={"14px"}></MdCheckCircle>
          <span className="text-[13px] font-Roboto font-medium text-accent1 ">We sent an email with a password-reset link.</span>
        </div>
      )}

      <button
        onClick={sendRecoveryEmail}
        className={`relative group  ml-auto mt-[15px] px-[16px] py-[6px] rounded duration-200 
         ${sendingEmail ? "pointer-events-none" : ""} ${formComplete ? "bg-accent1 hover:bg-accent2" : "bg-neu1-5/50"}`}
      >
        <span className={`text-[16px] text-neu1-1 font-Raleway font-bold group-invalid:opacity-50 ${sendingEmail ? "invisible" : ""}`}>
          Send
        </span>
        {sendingEmail && <SpinnerC width={30} height={30} className="absolute top-0 left-0 w-full h-full"></SpinnerC>}
      </button>
    </form>
  );
};

export default RecoverPasswordForm;
