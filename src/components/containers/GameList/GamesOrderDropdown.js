import { useState } from "react";
import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import GamesOrderByDropdownMenu from "./GamesOrderByDrowpdownMenu";

const GamesOrderDropdown = props => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside([dropdownRef], () => setShowDropdown(false));

  return (
    <div className="relative z-[10] w-fit" ref={dropdownRef}>
      <button
        className={`flex items-center gap-x-[10px] px-[12px] py-[8px] rounded-md ${
          showDropdown ? "bg-accent1" : "bg-neu1-1 dark:bg-neu1-9"
        }  w-fit duration-200 ${!!props.disabled ? "opacity-50" : "opacity-100"}`}
        onClick={() => setShowDropdown(!showDropdown)}
        tabIndex="0"
        disabled={!!props.disabled}
      >
        <span
          className={`font-Raleway font-medium text-[13px] ${showDropdown ? "text-neu1-3" : "text-neu1-6"} dark:text-neu1-3 select-none`}
        >
          {"Order by: "}
        </span>
        <span
          className={`font-System font-bold text-[14px] ${showDropdown ? "text-neu1-1" : "text-neu1-10"}  dark:text-neu1-1 select-none`}
        >
          {props.selectedOrder.name}
        </span>
        <IoIosArrowDown
          className={`dark:text-neu1-1 duration-200 ${showDropdown ? "rotate-180 text-neu1-1" : "text-neu1-10"}`}
        ></IoIosArrowDown>
      </button>
      <GamesOrderByDropdownMenu
        className={`${!showDropdown ? "opacity-0 scale-y-0" : ""}`}
        selectedOrder={props.selectedOrder.value}
        onOptionClick={() => setShowDropdown(false)}
      ></GamesOrderByDropdownMenu>
    </div>
  );
};

export default GamesOrderDropdown;
