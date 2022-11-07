import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavMenu } from "../../features/nav-menu/navMenuSlice";
import IconButton from "../buttons/IconButton";

const NavMenuButton = () => {
  const dispatch = useDispatch();
  const navMenuState = useSelector(state => state.navMenu);

  return (
    <IconButton onClick={() => dispatch(toggleNavMenu(!navMenuState.visible))}>
      <MdMenu className="text-neu1-8 dark:text-neu1-3 min-w-[30px] z-10" size={30}></MdMenu>
    </IconButton>
  );
};

export default NavMenuButton;
