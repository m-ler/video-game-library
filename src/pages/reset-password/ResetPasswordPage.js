import { useEffect } from "react";
import ManGaming from "../../assets/svgr/illustration/ManGaming";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPage = () => {

  useEffect(() => {
    document.title = "Reset password"
  }, []);

  return (
    <div className="w-full p-[20px] flex flex-col gap-[25px] h-full m-auto sm:mt-0 duration-200 overflow-auto max-h-full">
      <ManGaming className="mx-auto mt-auto sm:mt-0 w-[min(100%,450px)] min-h-[150px] animate-[hueShift_3s_linear_infinite_alternate] text-accent3"></ManGaming>

      <div className="w-[min(100%,450px)] mx-auto mb-auto flex flex-col gap-y-[30px]">
        <h1 className="text-[36px] text-neu1-8 dark:text-neu1-2 font-system font-bold leading-[26px]">Reset password</h1>
        <ResetPasswordForm></ResetPasswordForm>
      </div>
    </div>
  );
};

export default ResetPasswordPage;