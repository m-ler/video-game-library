import { useEffect } from "react";
import { useState } from "react";
import { cloneElement } from "react";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import SpinnerB from "../elements/loading-animations/SpinnerB";
import SpinnerC from "../elements/loading-animations/SpinnerC";
import { forwardRef } from "react";
import regularExpressions from "../../utils/regularExpressions";
import { useRef } from "react";
import { useImperativeHandle } from "react";

const iconStyle = `absolute left-[16px] text-neu2-6 dark:text-neu2-2 min-w-[22px]`;
const inputStyle = `peer bg-neu1-1 dark:bg-neu1-9 w-full text-neu2-6 dark:text-neu2-2 outline-0 text-[14px] font-Roboto font-bold pl-[48px] pr-[16px] py-[12px] border-b-[2px] 
  border-b-accent3 rounded-tr-[5px] rounded-tl-[5px] duration-200 focus:pt-[32px] focus:border-b-accent2 valid:pt-[32px]
`;
const labelStyle = `absolute top-[12px] focus:top-[8px] left-[48px] text-[14px] text-accent3 font-Roboto font-medium duration-200 
  peer-focus:text-[12px] peer-focus:text-accent2 peer-valid:text-[12px]
`;

const spinnerStyle = `absolute left-[11px] text-neu2-6 dark:text-neu2-2`;

const inputWrapperStyle = `flex items-center gap-x-[12px] relative duration-200`;

const FormInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const [validating, setValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputElementRef = useRef();
  useImperativeHandle(ref, () => inputElementRef.current);

  useEffect(() => {
    const inputContentIsValid = !regularExpressions.isEmpty.test(value) && !regularExpressions.allAreSpaces.test(value);

    if (value === "" || !props.validate) {
      setErrorMessage("");
      !!props.onChange && props.onChange(inputElementRef.current, inputContentIsValid);
      return;
    }

    setValidating(true);

    const runValidation = async () => {
      const validationMessage = await props.validate(value);
      setErrorMessage(validationMessage);
      setValidating(false);
      !!props.onChange && props.onChange(inputElementRef.current, !validationMessage);
    };

    runValidation();
  }, [value]);

  const handleOnChange = e => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className={inputWrapperStyle}>
        {validating ? (
          <SpinnerC className={spinnerStyle} width={32} height={32}></SpinnerC>
        ) : (
          cloneElement(props.icon, { className: iconStyle, size: "20px" })
        )}
        <input
          id={props.id}
          type={props.type || "text"}
          className={inputStyle}
          spellCheck="false"
          required
          autoComplete="new-password"
          onBlur={handleOnChange}
          ref={inputElementRef}
        ></input>
        <span className={labelStyle}>{props.label}</span>
      </div>
      {!!errorMessage && (
        <div className="flex items-center gap-x-[5px] my-[5px] animate-[fadeIn_0.3s_ease-out]">
          <MdError className="text-error min-w-[14px]" size={"14px"}></MdError>
          <span className="text-error text-[12px] font-Lato font-semibold">{errorMessage}</span>
        </div>
      )}
    </div>
  );
});

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onChange: PropTypes.func,
  validate: PropTypes.func,
};

export default FormInput;
