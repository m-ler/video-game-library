import { useDispatch } from "react-redux";
import { setOrderBy } from "../../features/filter/gamesFiltersSlice";
import orderByOptions from "../../data/orderByOptions";
import { useSearchParams } from "react-router-dom";

const GamesOrderByDropdownMenu = props => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const onOptionClick = item => {
    props.onOptionClick(item);
    setSearchParams({ order: item.value });
    //dispatch(setOrderBy(item.value));
  };

  const getMenuElement = (item, index) => {
    return (
      <li
        key={index}
        className={`text-[14px] px-[20px] py-[5px] duration-200 cursor-pointer text-neu1-7 dark:text-neu1-3 font-System hover:bg-accent1 hover:font-bold hover:text-neu1-3 ${
          props.selectedOrder === item.value ? "bg-accent1 font-bold text-neu1-3" : "font-medium"
        }`}
        onClick={() => onOptionClick(item)}
      >
        {item.name}
      </li>
    );
  };

  return (
    <ul
      className={`bg-neu1-1 dark:bg-neu1-10 border border-neu1-4 dark:border-neu1-5 py-[15px] w-full absolute top-[calc(100%+10px)] left-[0px] z-10 rounded-lg drop-shadow-lg duration-200 
      origin-top ${props.className}`}
    >
      {orderByOptions.map((item, index) => getMenuElement(item, index))}
    </ul>
  );
};

export default GamesOrderByDropdownMenu;
