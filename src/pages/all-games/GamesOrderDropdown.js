import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import GamesOrderByDropdownMenu from "./GamesOrderByDrowpdownMenu";
import OrderByOptions from "../../data/orderByOptions";

const GamesOrderDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const gamesFilters = useSelector(state => state.gamesFilters);

  const onDocumentClick = e => {
    const clickedOutside = !dropdownRef.current.contains(e.target);
    clickedOutside && setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div className="relative z-10 w-fit" ref={dropdownRef}>
      <button
        className={`flex items-center gap-x-[10px] px-[12px] py-[8px] rounded-md ${
          showDropdown ? "bg-accent1" : "bg-neu1-1 dark:bg-neu1-9"
        }  cursor-pointer w-fit duration-200`}
        onClick={() => setShowDropdown(!showDropdown)}
        tabIndex="0"
      >
        <span
          className={`font-Raleway font-medium text-[13px] ${showDropdown ? "text-neu1-3" : "text-neu1-6"} dark:text-neu1-3 select-none`}
        >
          Order by:{" "}
        </span>
        <span
          className={`font-System font-bold text-[14px] ${showDropdown ? "text-neu1-1" : "text-neu1-10"}  dark:text-neu1-1 select-none`}
        >
          {OrderByOptions.find(x => x.value === gamesFilters.OrderBy).name}
        </span>
        <IoIosArrowDown className={`dark:text-neu1-1 duration-200 ${showDropdown ? "rotate-180 text-neu1-1" : "text-neu1-10"}`}></IoIosArrowDown>
      </button>
      <GamesOrderByDropdownMenu
        className={`${!showDropdown ? "opacity-0 scale-y-0" : ""}`}
        selectedOrder={gamesFilters.OrderBy}
        onOptionClick={() => setShowDropdown(false)}
      ></GamesOrderByDropdownMenu>
    </div>
  );
};

export default GamesOrderDropdown;
