import { useState } from "react";
import { useRef } from "react";
import { MdEmail, MdError } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import SpinnerC from "../../components/elements/loading-animations/SpinnerC";
import FormInput from "../../components/forms/FormInput";
import signIn from "../../firebase/signIn";
import regularExpressions from "../../utils/regularExpressions";

const validateEmail = async value => {
  if (!regularExpressions.validEmail.test(value)) return "Invalid email.";
};

const LogInForm = () => {
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = useState(false);
  const [logging, setLogging] = useState(false);
  const [loginErrorMessage, setloginErrorMessage] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const inputsStatesRef = useRef({});

  const onInputChange = (inputElement, isValid) => {
    inputsStatesRef.current[inputElement.id] = isValid;
    setFormComplete(Object.values(inputsStatesRef.current).every(value => value));
  };

  const logIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLogging(true);
    setloginErrorMessage("");
    const [passed, errorMessage] = await signIn(email, password);
    setLogging(false);
    if (passed) {
      navigate("/games");
      return;
    }

    !!errorMessage && setloginErrorMessage(errorMessage);
  };

  return (
    <div className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]">
      <FormInput
        id="login-email"
        label="Email"
        type="text"
        icon={<MdEmail></MdEmail>}
        validate={validateEmail}
        ref={emailRef}
        onChange={onInputChange}
      ></FormInput>
      <FormInput
        id="login-password"
        label="Password"
        type="password"
        icon={<RiLockPasswordFill></RiLockPasswordFill>}
        ref={passwordRef}
        onChange={onInputChange}
      ></FormInput>

      {!!loginErrorMessage && (
        <div className="animate-[shake_0.3s_linear]">
          <MdError className="inline text-error min-w-[14px] mr-[5px]" size={"14px"}></MdError>
          <span className="text-[13px] font-Roboto font-medium text-error ">{loginErrorMessage}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-[15px] justify-between mt-[15px]">
        <Link to="/" className="text-neu1-5 text-medium font-System text-[14px] hover:underline">
          Forgot your password?
        </Link>
        <button
          onClick={() => !logging && formComplete && logIn()}
          className={`relative group  ml-auto mt-[15px] px-[16px] py-[6px] rounded duration-200 
         ${logging ? "pointer-events-none" : ""} ${formComplete ? "bg-accent1 hover:bg-accent2" : "bg-neu1-5/50"}`}
        >
          <span className={`text-[16px] text-neu1-1 font-Raleway font-bold group-invalid:opacity-50 ${logging ? "invisible" : ""}`}>
            Login
          </span>
          {logging && <SpinnerC width={30} height={30} className="absolute top-0 left-0 w-full h-full"></SpinnerC>}
        </button>
      </div>
    </div>
  );
};

export default LogInForm;
