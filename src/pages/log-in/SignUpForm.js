import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import FormInput from "../../components/forms/FormInput";
import regularExpressions from "../../utils/regularExpressions";
import { useRef } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const validateEmail = async value => {
  const delay = time => new Promise(res => setTimeout(res, time));
  await delay(500);
  if (!regularExpressions.validEmail.test(value)) return "Invalid email.";
};

const validateUserName = async value => {};

const validatePassword = async value => {};

const SignUpForm = () => {
  const [formComplete, setFormComplete] = useState(false);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const inputsStatesRef = useRef({});
  console.log(auth.currentUser)

  const onInputChange = (inputElement, isValid) => {
    inputsStatesRef.current[inputElement.id] = isValid;
    console.log(inputsStatesRef.current);
    setFormComplete(Object.values(inputsStatesRef.current).every(value => value));
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(userCredential => {
        // Signed in
        //const user = userCredential.user;
        updateProfile(auth.currentUser, { 
          displayName: usernameRef.current.value,
        })
          .then(() => {
            // Profile updated!
            console.log("profile updated");
            // ...
          })
          .catch(error => {
            console.error(error);
            // An error occurred
            // ...
          });
        // ...
      })
      .catch(error => {
        console.error(error);
        // ..
      });
  };

  return (
    <div className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]">
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
        onClick={signUp}
        disabled={!formComplete}
        className="text-[16px] text-neu1-1 font-Raleway font-bold bg-accent1 ml-auto mt-[15px] px-[16px] py-[6px] rounded enabled:hover:bg-accent2 duration-200 disabled:bg-neu1-5 disabled:opacity-50"
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUpForm;
