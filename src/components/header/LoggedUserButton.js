import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tippy";
import Popup from "reactjs-popup";
import UserAvatarButton from "../user/UserAvatarButton";
import UserModal from "../user/UserModal";

const LoggedUserButton = () => {
  const userBotonRef = useRef();

  useEffect(() => {}, []);

  const button = (
    <div>
      <UserAvatarButton></UserAvatarButton>
    </div>
  );

  return (
    <div className="relative" ref={userBotonRef}>
      <Popup trigger={button} closeOnDocumentClick closeOnEscape={true} modal lockScroll={true} className="bg-accent2">
        <UserModal></UserModal>
      </Popup>
    </div>
  );
};

export default LoggedUserButton;
