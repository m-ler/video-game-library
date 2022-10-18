import { MdKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const GamesPlatformFilterDropdownMenu = props => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onOptionClick = item => {
    !!props.onOptionClick && props.onOptionClick(item);
    searchParams.set("platform", item.slug);
    setSearchParams(searchParams);
  };

  const getMenuElement = (item, index) => {
    const hasPlatforms = item.platforms?.filter(x => x.slug !== item.slug)?.length > 0;
    const isSelected = item.slug === props.selectedOption || item.platforms?.some(x => x.slug === props.selectedOption);
    return (
      <li className="group relative" key={index}>
        <div
          onClick={e => e.currentTarget === e.target && onOptionClick(item)}
          className={`text-[14px] block px-[20px] flex items-center gap-x-[10p] justify-between py-[5px] duration-200 cursor-pointer text-neu1-7 dark:text-neu1-3 font-System hover:bg-accent1 
          hover:text-neu1-3 ${isSelected ? "bg-accent1 font-bold text-neu1-1 dark:text-neu1-1" : "font-medium"}`}
        >
          {item.name}
          {hasPlatforms && (
            <MdKeyboardArrowRight
              size={18}
              className={`block text-neu1-5 group-hover:text-accent3 ${isSelected ? "text-neu1-1 dark:text-neu1-1" : ""}`}
            ></MdKeyboardArrowRight>
          )}
        </div>
        {hasPlatforms && (
          <GamesPlatformFilterDropdownMenu
            platformList={item.platforms}
            className="platform-child hidden group-hover:block left-[100%] top-[0px_!important]"
            onOptionClick={props.onOptionClick}
            selectedOption={props.selectedOption}
          ></GamesPlatformFilterDropdownMenu>
        )}
      </li>
    );
  };

  return (
    <ul
      className={`bg-neu1-1 dark:bg-neu1-10 border border-neu1-4 dark:border-neu1-5 py-[15px] w-max absolute top-[calc(100%+10px)] left-[0px] z-10 rounded-lg drop-shadow-lg duration-200 
      origin-top ${props.className}`}
    >
      {props.platformList.map((item, index) => getMenuElement(item, index))}
    </ul>
  );
};

export default GamesPlatformFilterDropdownMenu;
