import { useEffect } from "react";
import { Tooltip } from "react-tippy";
import { auth } from "../../firebase/firebase";

const LoggedUserButton = () => {
  useEffect(() => {
    console.log(auth.currentUser);
  }, []);

  const handleClick = e => {};

  return (
    <div>
      <Tooltip title={auth.currentUser?.displayName} trigger="mouseenter" delay={100} size="small" theme="transparent">
        <button
          className={`bg-neu2-7 dark:bg-d-ter p-[8px] rounded-full hover:brightness-125 transition duration-300`}
          onClick={handleClick}
        >
          A
        </button>
      </Tooltip>
    </div>
  );
};

export default LoggedUserButton;
