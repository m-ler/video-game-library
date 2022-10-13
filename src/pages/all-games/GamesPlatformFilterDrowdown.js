import { useRef, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import platformsFilterOptions from "../../data/platformsFilterOptions";
import GamesPlatformFilterDropdownMenu from "./GamesPlatformFilterDropdownMenu";
import { setGamePlatforms } from "../../features/data/gamePlatforms";
import useApiRequest from "../../hooks/useApiRequest";
import { getParentPlatformList } from "../../utils/apiRequests";

const GamesPlatformFilterDrowdown = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState();
  const gamesFilters = useSelector(state => state.gamesFilters);
  const platformList = useSelector(state => state.gamePlatforms);
  const dropdownRef = useRef();
  const platformListRequest = useApiRequest(getParentPlatformList);

  const onDocumentClick = e => {
    if (!dropdownRef.current) return;
    const clickedOutside = !dropdownRef.current.contains(e.target);
    clickedOutside && setShowDropdown(false);
  };

  useEffect(() => {
    if (!platformListRequest.data?.results) return;

    const platformListData = platformListRequest.data.results.map(x => {
      return {
        id: x.id,
        name: x.name,
        slug: x.slug,
        platforms: x.platforms.map(y => {
          return {
            id: y.id,
            name: y.name,
            slug: y.slug,
          };
        }),
      };
    });

    dispatch(setGamePlatforms(platformListData));
  }, [platformListRequest.data]);

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    platformListRequest.makeRequest();

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    platformList.length > 0 && (
      <div className="relative z-[9] w-fit" ref={dropdownRef}>
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
            {"Platform: "}
          </span>
          <span
            className={`font-System font-bold text-[14px] ${showDropdown ? "text-neu1-1" : "text-neu1-10"}  dark:text-neu1-1 select-none`}
          >
            {gamesFilters.Platform}
          </span>
          <IoIosArrowDown
            className={`dark:text-neu1-1 duration-200 ${showDropdown ? "rotate-180 text-neu1-1" : "text-neu1-10"}`}
          ></IoIosArrowDown>
        </button>
        <GamesPlatformFilterDropdownMenu
          className={`${!showDropdown ? "opacity-0 scale-y-0" : ""}`}
          onOptionClick={() => setShowDropdown(false)}
          platformList={platformList}
        ></GamesPlatformFilterDropdownMenu>
      </div>
    )
  );
};

export default GamesPlatformFilterDrowdown;
