import { useEffect } from "react";
import DualsensePeople from "../../assets/svgr/illustration/DualsensePeople";
import RecoverPasswordForm from "./RecoverPasswordForm";

const RecoverPasswordPage = () => {
  useEffect(() => {
    document.title = "Recover password";
  }, []);

  return (
    <div className="w-full p-[20px] flex flex-col gap-[25px] h-full m-auto  sm:mt-[52px] duration-200 overflow-auto max-h-full">
      <DualsensePeople className="mx-auto mt-auto sm:mt-0 w-[min(100%,450px)] min-h-[150px] animate-[hueShift_3s_linear_infinite_alternate]"></DualsensePeople>

      <div className="w-[min(100%,450px)] mx-auto mb-auto flex flex-col gap-y-[30px]">
        <h1 className="text-[36px] text-neu1-8 dark:text-neu1-2 font-system font-bold leading-[26px]">Password recovery</h1>
        <RecoverPasswordForm></RecoverPasswordForm>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
