import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import FormInput from "../../components/forms/FormInput";
import regularExpressions from "../../utils/regularExpressions";
import { useRef } from "react";
import { useState } from "react";
import createUser from "../../firebase/auth/createUser";
import { useNavigate } from "react-router-dom";
import SpinnerC from "../../components/loading-animations/SpinnerC";
import { emailExists, usernameExists } from "../../firebase/fireStore/firestoreQueries";
import signIn from "../../firebase/auth/signIn";

const validateEmail = async value => {
  if (!regularExpressions.validEmail.test(value)) return "Invalid email.";
  if (await emailExists(value)) return "That email is taken. Please try another.";
};

const validateUserName = async value => {
  if (await usernameExists(value)) return "That username is taken. Please try another.";
};

const validatePassword = async value => {
  if (value.length < 6) return "Password must contain at least 6 characters.";
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const inputsStatesRef = useRef({});

  const onInputChange = (inputElement, isValid) => {
    inputsStatesRef.current[inputElement.id] = isValid;
    setFormComplete(Object.values(inputsStatesRef.current).every(value => value));
  };

  const signUp = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;

    setCreatingUser(true);
    const userCredential = await createUser({ email, password, username });
    setCreatingUser(false);
    if (!!userCredential) {
      await signIn(email, password);
      navigate("/games");
    }
  };

  const onFormSubmit = e => e.preventDefault();

  return (
    <form className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]" onSubmit={onFormSubmit}>
      <FormInput
        id="sign-up-email"
        label="Email"
        type="text"
        icon={<MdEmail></MdEmail>}
        validate={validateEmail}
        onChange={onInputChange}
        ref={emailRef}
      ></FormInput>
      <FormInput
        id="sign-up-username"
        label="Username"
        type="text"
        icon={<AiFillEdit></AiFillEdit>}
        validate={validateUserName}
        onChange={onInputChange}
        ref={usernameRef}
      ></FormInput>
      <FormInput
        id="sign-up-password"
        label="Create password"
        type="password"
        icon={<RiLockPasswordFill></RiLockPasswordFill>}
        validate={validatePassword}
        onChange={onInputChange}
        ref={passwordRef}
      ></FormInput>

      <button
        onClick={() => !creatingUser && formComplete && signUp()}
        className={`relative group  ml-auto mt-[15px] px-[16px] py-[6px] rounded duration-200 
         ${creatingUser ? "pointer-events-none" : ""} ${formComplete ? "bg-accent1 hover:bg-accent2" : "bg-neu1-5/50"}`}
      >
        <span className={`text-[16px] text-neu1-1 font-Raleway font-bold ${creatingUser ? "invisible" : ""}`}>Sign up</span>
        {creatingUser && <SpinnerC width={30} height={30} className="absolute top-0 left-0 w-full h-full"></SpinnerC>}
      </button>
    </form>
  );
};

export default SignUpForm;
