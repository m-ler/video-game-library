import { ReactComponent as Logo } from "./../../assets/svg/logo.svg";
import ThemeButton from "./ThemeButton";
import { Link } from "react-router-dom";
import SearchBar from "./search-bar/SearchBar";
import NavMenuButton from "./NavMenuButton";
import UserButton from "./UserButton";
import LoggedUserButton from "./LoggedUserButton";
import { useSelector } from "react-redux";

const Header = props => {
  const currentUser = useSelector(state => state.firebase.currentUser);

  return (
    <header className="flex items-center gap-x-[25px] sm:gap-[15px] p-[20px] sm:py-[10px] w-full flex-wrap sm:flex-nowrap gap-y-[15px] w-full border-b border-b-neu1-3 dark:border-b-neu1-9 z-10">
      {props.withNavMenuButton && <NavMenuButton></NavMenuButton>}
      <div className="flex items-center gap-x-[10px]">
        <Link to="/">
          <Logo className="max-w-[58px] sm:max-w-[44px] h-full fill-neu1-10 dark:fill-neu1-1"></Logo>
        </Link>
      </div>
      <div className="flex items-center gap-x-[10px] mx-auto grow">
        <SearchBar></SearchBar>
        <div className="flex gap-[10px] sm:hidden">
          <ThemeButton></ThemeButton>
          {props.withUserButton ? !!currentUser ? <LoggedUserButton></LoggedUserButton> : <UserButton></UserButton> : ""}
        </div>
      </div>
    </header>
  );
};

export default Header;
