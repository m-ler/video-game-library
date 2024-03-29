import orderByOptions from "./orderByOptions";
import { useSearchParams } from "react-router-dom";

const GamesOrderByDropdownMenu = props => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onOptionClick = item => {
    props.onOptionClick(item);
    searchParams.set("order", item.value);
    setSearchParams(searchParams);
  };

  const getMenuElement = (item, index) => {
    return (
      <li
        key={index}
        className={`text-[14px] px-[20px] py-[5px] duration-200 cursor-pointer font-System hover:bg-accent1 hover:font-bold hover:text-neu1-3 ${
          props.selectedOrder === item.value ? "bg-accent1 font-bold text-neu1-1 dark:text-neu1-1" : "text-neu1-6 dark:text-neu1-4 font-medium"
        }`}
        onClick={() => onOptionClick(item)}
      >
        {item.name}
      </li>
    );
  };

  return (
    <ul
      className={`bg-neu1-1 dark:bg-neu1-10 border border-neu1-4 dark:border-neu1-5 py-[15px] w-max  z-10 rounded-lg drop-shadow-lg duration-200 
      animate-[fadeIn_.2s_linear] ${props.className}`}
    >
      {orderByOptions.map((item, index) => getMenuElement(item, index))}
    </ul>
  );
};

export default GamesOrderByDropdownMenu;
