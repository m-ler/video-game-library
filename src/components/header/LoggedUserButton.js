import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tippy";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import LoggedUserMenu from "./LoggedUserMenu";

const LoggedUserButton = () => {
  const currentUser = useSelector(state => state.firebase.currentUser);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userBotonRef = useRef();
  useOnClickOutside([userBotonRef], () => setShowUserMenu(false));

  useEffect(() => {}, []);

  return (
    <div className="relative" ref={userBotonRef}>
      <Tooltip title={currentUser?.displayName} trigger="mouseenter" delay={100} size="small" theme="transparent">
        <button
          className={`w-[38px] aspect-square bg-neu2-7 dark:bg-d-ter rounded-full hover:brightness-125 transition duration-300 font-bold text-white text-[18px]
          bg-gradient-to-bl from-accent1 to-accent2`}
          onClick={() => setShowUserMenu(true)}
        >
          {currentUser.displayName[0].toUpperCase()}
        </button>
      </Tooltip>

      <LoggedUserMenu show={showUserMenu}></LoggedUserMenu>
    </div>
  );
};

export default LoggedUserButton;
