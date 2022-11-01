import { useEffect } from "react";
import { useState } from "react";
import WomanArcade from "../../assets/svgr/illustration/WomanArcade";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const optionTabStyle = `text-neu1-8 dark:text-neu1-2 text-[24px] grow font-Rubik font-bold border-b border-b-[3px] px-[12px] py-[8px] hover:bg-neu1-3 
rounded-tl-[10px] rounded-tr-[10px] dark:hover:bg-neu1-9 duration-200`;

const LogInPage = () => {
  useEffect(() => {
    document.title = "Login"
  }, []);

  const [logIn, setLogIn] = useState(true);

  return (
    <div className="w-full p-[20px] flex flex-col gap-[25px] h-full m-auto sm:mt-0 duration-200 overflow-auto max-h-full">
      <WomanArcade className="mx-auto mt-auto sm:mt-0 w-[min(100%,450px)] min-h-[150px] animate-[hueShift_3s_linear_infinite_alternate]"></WomanArcade>

      <div className="w-[min(100%,450px)] mx-auto mb-auto flex flex-col gap-y-[30px]">
        <div className="flex grow">
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
