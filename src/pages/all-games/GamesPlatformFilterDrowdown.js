import { useRef, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import GamesPlatformFilterDropdownMenu from "./GamesPlatformFilterDropdownMenu";
import { platformList, flattenPlatformList } from "../../data/platformList";
import { useSelector } from "react-redux";

const GamesPlatformFilterDrowdown = props => {
  const [showDropdown, setShowDropdown] = useState();
  const gamesFilters = useSelector(state => state.gamesFilters);
  const dropdownRef = useRef();

  const onDocumentClick = e => {
    if (!dropdownRef.current) return;
    const clickedOutside = !dropdownRef.current.contains(e.target);
    clickedOutside && setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return gamesFilters.Platform !== null ? (
    <div className="relative z-[9] w-fit" ref={dropdownRef}>
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
          {"Platform: "}
        </span>
        <span
          className={`font-System font-bold text-[14px] ${showDropdown ? "text-neu1-1" : "text-neu1-10"}  dark:text-neu1-1 select-none`}
        >
          {gamesFilters.Platform.name}
        </span>
        <IoIosArrowDown
          className={`dark:text-neu1-1 duration-200 ${showDropdown ? "rotate-180 text-neu1-1" : "text-neu1-10"}`}
        ></IoIosArrowDown>
      </button>
      <GamesPlatformFilterDropdownMenu
        className={`${!showDropdown ? "opacity-0 scale-y-0" : ""}`}
        onOptionClick={() => setShowDropdown(false)}
        platformList={platformList}
        selectedOption={gamesFilters.Platform.slug}
      ></GamesPlatformFilterDropdownMenu>
    </div>
  ) : (
    ""
  );
};

export default GamesPlatformFilterDrowdown;
