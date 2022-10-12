import { cloneElement, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { gamesLinks, platformLinks, browseLinks } from "../../data/navDrawerLinks";

const NavigationDrawer = () => {
  const [selectedMenu, setSelectedMenu] = useState();

  const getNavElement = (element, index) => {
    return (
      <Link
        key={index}
        to={element.link}
        className="group flex items-center gap-x-[7px] duration-200 py-[7px] rounded-tr-lg rounded-br-lg hover:px-[10px] hover:bg-neu1-3 dark:hover:bg-neu1-9"
      >
        <span className="p-[5px] bg-neu1-3 dark:bg-neu1-8 group-hover:bg-accent1 dark:group-hover:bg-neu1-3 rounded-md duration-200">
          {cloneElement(element.icon, {
            className: "text-neu1-8 dark:text-neu1-1 group-hover:text-neu1-1 dark:group-hover:text-accent1  duration-200",
          })}
        </span>
        <h3 className="text-neu1-10 dark:text-neu1-1 font-System font-medium text-[14px]">{element.label}</h3>
      </Link>
    );
  };

  return (
    <aside
      id="nav-drawer"
      className="bg-gradient-to-l from-black/5 dark:from-black/10 h-full px-[20px] overflow-auto flex flex-col duration-100 basis-[300px]"
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
    </aside>
  );
};

export default NavigationDrawer;
