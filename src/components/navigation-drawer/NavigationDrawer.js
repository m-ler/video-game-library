import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { gamesLinks, platformLinks, browseLinks } from "../../data/navDrawerLinks";
import { toggleNavMenu } from "../../features/nav-menu/navMenuSlice";
import { isScreenMobile } from "../../utils/environment";
import LoggedUserButton from "../header/LoggedUserButton";
import ThemeButton from "../header/ThemeButton";
import UserButton from "../header/UserButton";
import NavigationElement from "./NavigationElement";

const NavigationDrawer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navMenuState = useSelector(state => state.navMenu);
  const currentUser = useSelector(state => state.firebase.currentUser);

  useEffect(() => {
    isScreenMobile() && dispatch(toggleNavMenu(false));
  }, [location]);

  return (
    <aside
      className={`top-0 md:fixed z-10 md:w-full  min-w-[250px] w-[250px] h-screen  bg-transparent md:bg-black/50  ${
        navMenuState.visible ? "" : "hidden"
      }`}
      onClick={e => e.currentTarget === e.target && dispatch(toggleNavMenu(false))}
    >
      <div
        className="top-[0px] left-0 fixed bg-neu1-2 dark:bg-neu1-10 h-full px-[20px] pb-[20px] md:scrollbar-hide overflow-auto flex flex-col 
        duration-100 max-w-[250px] w-full pt-[80px] sm:pt-[50px]"
      >
        <div className="hidden sm:flex gap-[10px] mt-[20px]">
          <ThemeButton></ThemeButton>
          {!!currentUser ? <LoggedUserButton></LoggedUserButton> : <UserButton></UserButton>}
        </div>

        <h3 className="text-neu1-6 dark:text-neu1-4 font-Roboto font-medium text-[14px] border-b border-b-neu1-3 dark:border-b-neu1-8 mt-[20px] pb-[5px] mb-[10px]">
          GAMES
        </h3>
        {gamesLinks.map((link, index) => (
          <NavigationElement linkItem={link} key={index}></NavigationElement>
        ))}
        <h3 className="text-neu1-6 dark:text-neu1-4 font-Roboto font-medium text-[14px] border-b border-b-neu1-3 dark:border-b-neu1-8 mt-[20px] pb-[5px] mb-[10px]">
          PLATFORMS
        </h3>
        {platformLinks.map((link, index) => (
          <NavigationElement linkItem={link} key={index}></NavigationElement>
        ))}
        <h3 className="text-neu1-6 dark:text-neu1-4 font-Roboto font-medium text-[14px] border-b border-b-neu1-3 dark:border-b-neu1-8 mt-[20px] pb-[5px] mb-[10px]">
          BROWSE
        </h3>
        {browseLinks.map((link, index) => (
          <NavigationElement linkItem={link} key={index}></NavigationElement>
        ))}
      </div>
    </aside>
  );
};

export default NavigationDrawer;
