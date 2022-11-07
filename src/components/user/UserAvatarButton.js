import { useSelector } from "react-redux";

const UserAvatarButton = props => {
  const currentUser = useSelector(state => state.firebase.currentUser);

  return (
    <button
      {...props}
      className={`w-[38px] aspect-square bg-neu2-7 dark:bg-d-ter rounded-full hover:brightness-125 transition duration-300 font-bold text-white text-[18px]
          bg-gradient-to-bl from-accent1 to-accent2`}
    >
      {currentUser.photoURL ? (
        <img
          src={`${currentUser.photoURL}&authTime=${currentUser.latestUpdateTime}`}
          className="rounded-full object-cover w-full h-full"
        ></img>
      ) : (
        currentUser.displayName[0].toUpperCase()
      )}
    </button>
  );
};

export default UserAvatarButton;
