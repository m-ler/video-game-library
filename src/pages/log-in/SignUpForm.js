import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import FormInput from "../../components/forms/FormInput";

const SignUpForm = () => {
  return (
    <div className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]">
      <FormInput label="Email" type="text" icon={<MdEmail></MdEmail>}></FormInput>
      <FormInput label="User name" type="text" icon={<AiFillEdit></AiFillEdit>}></FormInput>
      <FormInput label="Create password" type="password" icon={<RiLockPasswordFill></RiLockPasswordFill>}></FormInput>

      <button className="text-[16px] text-neu1-1 font-Raleway font-bold bg-accent1 ml-auto mt-[15px] px-[16px] py-[6px] rounded hover:bg-accent2 duration-200">
        Sign up
      </button>
    </div>
  );
};

export default SignUpForm;
