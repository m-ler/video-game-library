import { ReactComponent as Logo } from "./../../assets/svg/logo.svg";
import ThemeButton from "./ThemeButton";
import { Link } from "react-router-dom";
import SearchBar from "./search-bar/SearchBar";
import NavMenuButton from "./NavMenuButton";
import UserButton from "./UserButton";
import LoggedUserButton from "./LoggedUserButton";
import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector(state => state.firebase.currentUser);

  return (
    <header className="flex items-center gap-x-[25px] px-[20px] py-[20px] w-full flex-wrap gap-y-[15px] w-full border-b border-b-neu1-3 dark:border-b-neu1-9 z-10">
      <NavMenuButton></NavMenuButton>
      <div className="flex items-center gap-x-[10px]">
        <Link to="/">
          <Logo className="min-w-[58px] w-8 h-9 fill-neu1-10 dark:fill-neu1-1"></Logo>
        </Link>
      </div>
      <div className="flex items-center gap-x-[10px] mx-auto grow">
        <SearchBar></SearchBar>
        <ThemeButton></ThemeButton>
        {!!currentUser ? <LoggedUserButton></LoggedUserButton> : <UserButton></UserButton>}
      </div>
    </header>
  );
};

export default Header;
