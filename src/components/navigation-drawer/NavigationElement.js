import { cloneElement } from "react";
import { useLocation, Link } from "react-router-dom";

const NavigationElement = props => {
  const location = useLocation();
  const routeSelected = !!props.linkItem.linkIsSelected && !!props.linkItem.linkIsSelected(location.pathname, location.search);

  return (
    <Link
      to={props.linkItem.route}
      className={`group flex items-center gap-x-[7px] duration-200 py-[7px] rounded-tr-lg rounded-br-lg hover:px-[10px] hover:bg-neu1-3 dark:hover:bg-neu1-9 ${
        routeSelected ? "bg-neu1-3 dark:bg-neu1-9 px-[10px] border-l-[4px] border-l-accent3" : ""
      }`}
    >
      <span
        className={`p-[5px] group-hover:bg-accent1 dark:group-hover:bg-neu1-3 rounded-md duration-200 ${
          routeSelected ? "bg-accent1 dark:bg-neu1-3" : "bg-neu1-3 dark:bg-neu1-8"
        }`}
      >
        {cloneElement(props.linkItem.icon, {
          className: `group-hover:text-neu1-1 dark:group-hover:text-accent1 duration-200 ${
            routeSelected ? "text-neu1-1 dark:text-accent1" : "text-neu1-8 dark:text-neu1-1"
          }`,
        })}
      </span>
      <h3 className="text-neu1-10 dark:text-neu1-1 font-System font-medium text-[14px]">{props.linkItem.name}</h3>
    </Link>
  );
};

export default NavigationElement;
