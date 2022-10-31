import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteUser from "../../firebase/deleteUser";
import signOut from "../../firebase/signOut";

const menuOptionStyle =
  "block text-neu1-3 font-Raleway font-semibold text-[14px] whitespace-nowrap py-[10px] px-[15px] hover:underline hover:bg-neu1-8 text-left";

const LoggedUserMenu = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const deleteAccountOnClick = async () => {
    const deleted = await deleteUser();
    deleted && signUserOut();
  };
  const signUserOut = async () => {
    const signedOut = await signOut();
    signedOut && navigate("/login");
  };

  return (
    <div
      className={`absolute top-[calc(100%+20px)] right-0 bg-neu1-9 border border-neu1-7 rounded-md shadow-lg py-[15px] flex flex-col w-fit duration-200 origin-top
      ${!props.show ? "opacity-0 scale-y-0" : ""}`}
      ref={ref}
    >
      <button>
        <Link to="/" className={menuOptionStyle}>
          My profile
        </Link>
      </button>

      <button className={menuOptionStyle} onClick={deleteAccountOnClick}>
        Delete account
      </button>

      <button className={menuOptionStyle} onClick={signUserOut}>
        Log out
      </button>
    </div>
  );
});

export default LoggedUserMenu;
