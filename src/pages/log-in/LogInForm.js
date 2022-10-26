import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import FormInput from "../../components/forms/FormInput";
import regularExpressions from "../../utils/regularExpressions";

const validateEmail = value => regularExpressions.validEmail.test(value);

const LogInForm = () => {
  return (
    <div className="flex flex-col gap-y-[15px] w-full animate-[fadeIn_0.3s_ease-out]">
      <FormInput label="Email" type="text" icon={<MdEmail></MdEmail>} validate={validateEmail} validationMessage=""></FormInput>
      <FormInput label="Password" type="password" icon={<RiLockPasswordFill></RiLockPasswordFill>}></FormInput>

      <div className="flex flex-wrap items-center gap-[15px] justify-between mt-[15px]">
        <Link to="/" className="text-neu1-5 text-medium font-System text-[14px] hover:underline">
          Forgot your password?
        </Link>
        <button className="text-[16px] text-neu1-1 font-Raleway font-bold bg-accent1 px-[16px] py-[6px] rounded hover:bg-accent2 duration-200">
          Login
        </button>
      </div>
    </div>
  );
};

export default LogInForm;
