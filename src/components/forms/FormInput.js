import { useEffect } from "react";
import { useState } from "react";
import { cloneElement } from "react";

const iconStyle = `absolute left-[16px] text-neu2-6 dark:text-neu2-2 min-w-[22px]`;
const inputStyle = `peer bg-neu1-1 dark:bg-neu1-9 w-full text-neu2-6 dark:text-neu2-2 outline-0 text-[14px] font-Roboto font-bold pl-[48px] pr-[16px] py-[12px] border-b-[2px] 
border-b-accent3 rounded-tr-[5px] rounded-tl-[5px] duration-200 focus:pt-[32px] focus:border-b-accent2 valid:pt-[32px]
`;
const labelStyle = `absolute top-[12px] focus:top-[8px] left-[48px] text-[14px] text-accent3 font-Roboto font-medium duration-200 
peer-focus:text-[12px] peer-focus:text-accent2 peer-valid:text-[12px]
`;

const FormInput = props => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const isValid = !!props.validate ? props.validate(value) : true;
    setValid(isValid);
  }, [value]);
  
  const inputWrapperStyle = `flex items-center gap-x-[12px] relative duration-200 ${valid ? "" : "mb-[20px]"}`;

  return (
    <div className={inputWrapperStyle}>
      {cloneElement(props.icon, { className: iconStyle, size: "20px" })}
      <input
        type={props.type || "text"}
        className={inputStyle}
        spellCheck="false"
        required
        autoComplete="new-password"
        onChange={e => setValue(e.target.value)}
      ></input>
      <span className={labelStyle}>{props.label}</span>
    </div>
  );
};

export default FormInput;
