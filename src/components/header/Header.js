import { ReactComponent as Logo } from "./../../assets/logo.svg";
import ThemeButton from "./ThemeButton";
import APIButton from "./APIButton";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { MdMenu } from "react-icons/md";
import IconButton from "../elements/buttons/IconButton";

const Header = () => {
  return (
    <header className="flex items-center gap-x-[25px] px-[20px] py-[20px] w-full flex-wrap gap-y-[15px] w-full border-b border-b-neu1-9">
      <IconButton
        onClick={() => {
          const navDrawer = document.querySelector("#nav-drawer");
          if (!navDrawer) return;
          ["hidden"].map(c => navDrawer.classList.toggle(c));
        }}
      >
        <MdMenu className="text-neu1-8 dark:text-neu1-3 min-w-[30px] z-10" size={30}></MdMenu>
      </IconButton>
      <div className="flex items-center gap-x-[10px]">
        <Link to="/">
          <Logo className="min-w-[58px] w-8 h-9 fill-neu1-10 dark:fill-neu1-1"></Logo>
        </Link>
      </div>
      <div className="mx-auto  grow">
        <SearchBar></SearchBar>
      </div>

      <div className="flex gap-x-[10px]">
        <APIButton></APIButton>
        <ThemeButton></ThemeButton>
      </div>
    </header>
  );
};

export default Header;
