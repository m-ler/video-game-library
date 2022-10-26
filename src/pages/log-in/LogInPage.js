import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const optionTabStyle = `text-neu1-8 dark:text-neu1-2 text-[24px] grow font-Rubik font-bold border-b border-b-[3px] px-[12px] py-[8px] hover:bg-neu1-3 dark:hover:bg-neu1-9 duration-200`;

const LogInPage = () => {
  const [logIn, setLogIn] = useState(true);

  return (
    <div className="w-full p-[20px]">
      <div className="w-[min(100%,400px)] m-auto border border-dashed border-accent2/50 flex flex-col gap-y-[30px]">
        <div className="flex">
          <button
            className={`${optionTabStyle} ${logIn ? "border-b-accent2" : "border-b-neu1-3 dark:border-b-neu1-6"}`}
            onClick={() => setLogIn(true)}
          >
            Login
          </button>
          <button
            className={`${optionTabStyle} ${logIn ? "border-b-neu1-3 dark:border-b-neu1-6" : "border-b-accent2"}`}
            onClick={() => setLogIn(false)}
          >
            Sign up
          </button>
        </div>

        {logIn ? <LogInForm></LogInForm> : <SignUpForm></SignUpForm>}
      </div>
    </div>
  );
};

LogInPage.propTypes = {};

export default LogInPage;
