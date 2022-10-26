import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

const UserButton = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");

  return (
    <Tooltip title='Log in' trigger='mouseenter' delay={100} size='small' theme='transparent'>
      <button className={`bg-neu2-7 dark:bg-d-ter p-[8px] rounded-full hover:brightness-125 transition duration-300`} onClick={handleClick}>
        <FaUserCircle size={"22px"} className="text-neu1-1"></FaUserCircle>
      </button>
    </Tooltip>
  );
};
export default UserButton;
