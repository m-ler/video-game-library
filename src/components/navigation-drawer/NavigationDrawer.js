import { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { gamesLinks, platformLinks, browseLinks } from "../../data/navDrawerLinks";
import { toggleNavMenu } from "../../features/nav-menu/navMenuSlice";

const NavigationDrawer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navMenuState = useSelector(state => state.navMenu);

  const getNavElement = (linkItem, index) => {
    const routeSelected = !!linkItem.linkIsSelected && !!linkItem.linkIsSelected(location.pathname, location.search);
    return (
      <Link
        key={index}
        to={linkItem.route}
        className={`group flex items-center gap-x-[7px] duration-200 py-[7px] rounded-tr-lg rounded-br-lg hover:px-[10px] hover:bg-neu1-3 dark:hover:bg-neu1-9 ${
          routeSelected ? "bg-neu1-3 dark:bg-neu1-9 px-[10px] border-l-[4px] border-l-accent3" : ""
        }`}
      >
        <span
          className={`p-[5px] group-hover:bg-accent1 dark:group-hover:bg-neu1-3 rounded-md duration-200 ${
            routeSelected ? "bg-accent1 dark:bg-neu1-3" : "bg-neu1-3 dark:bg-neu1-8"
          }`}
        >
          {cloneElement(linkItem.icon, {
            className: `group-hover:text-neu1-1 dark:group-hover:text-accent1 duration-200 ${
              routeSelected ? "text-neu1-1 dark:text-accent1" : "text-neu1-8 dark:text-neu1-1"
            }`,
          })}
        </span>
        <h3 className="text-neu1-10 dark:text-neu1-1 font-System font-medium text-[14px]">{linkItem.name}</h3>
      </Link>
    );
  };

  return (
    <aside
      className={`absolute top-0 left-0 z-10 bg-black/50 w-full h-full sm:w-[300px] sm:relative sm:bg-transparent ${
        navMenuState.visible ? "" : "hidden"
      }`}
      onClick={e => e.currentTarget === e.target && dispatch(toggleNavMenu(false))}
    >
      <div
        className="sm:bg-gradient-to-l sm:from-black/5 sm:dark:from-black/10 bg-neu1-1 dark:bg-neu1-10 h-full px-[20px] pb-[20px] overflow-auto flex flex-col 
        duration-100 max-w-[250px] relative"
      >
        <h3 className="text-neu1-6 dark:text-neu1-4 font-Roboto font-medium text-[14px] border-b border-b-neu1-3 dark:border-b-neu1-8 my-[20px] pb-[5px] mb-[10px]">
          GAMES
        </h3>
        {gamesLinks.map((link, index) => getNavElement(link, index))}
        <h3 className="text-neu1-6 dark:text-neu1-4 font-Roboto font-medium text-[14px] border-b border-b-neu1-3 dark:border-b-neu1-8 my-[20px] pb-[5px] mb-[10px]">
          PLATFORMS
        </h3>
        {platformLinks.map((link, index) => getNavElement(link, index))}
        <h3 className="text-neu1-6 dark:text-neu1-4 font-Roboto font-medium text-[14px] border-b border-b-neu1-3 dark:border-b-neu1-8 my-[20px] pb-[5px] mb-[10px]">
          BROWSE
        </h3>
        {browseLinks.map((link, index) => getNavElement(link, index))}
      </div>
    </aside>
  );
};

export default NavigationDrawer;
