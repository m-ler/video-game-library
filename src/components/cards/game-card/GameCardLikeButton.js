import { useState } from "react";
import { MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCurrentUserLikes } from "../../../features/firebase/firebaseSlice";
import saveGame from "../../../firebase/fireStore/games/saveVideoGame";
import updateUserLikes from "../../../firebase/fireStore/users/updateUserLikes";
import IconButton from "../../elements/buttons/IconButton";
import SpinnerC from "../../elements/loading-animations/SpinnerC";

const GameCardLikeButton = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.firebase.currentUser);
  const userLikes = useSelector(state => state.firebase.currentUserLikes);
  const liked = userLikes?.includes(props.game.id) || false;
  const [loading, setLoading] = useState(false);

  const updateLike = async () => {
    setLoading(true);
    const newLikesArray = liked ? userLikes.filter(x => x !== props.game.id) : [...userLikes, props.game.id];
    await saveGame(props.game);
    const updatedLikes = await updateUserLikes(currentUser.uid, newLikesArray);
    setLoading(false);
    if (!updatedLikes) return;
    dispatch(setCurrentUserLikes(newLikesArray));
    toast(liked ? "Removed from favorites" : "Added to favorites", { autoClose: 1000 });
  };

  if (userLikes === null) return "";

  return loading ? (
    <SpinnerC className="max-w-[28px]" width={28} height={28}></SpinnerC>
  ) : (
    <IconButton onClick={updateLike}>
      {liked ? (
        <MdThumbUp
          title="Remove from favorites"
          className="text-accent1 dark:text-accent3 min-w-[24px] hover:text-accent2 dark:hover:text-accent2"
          size="20px"
        ></MdThumbUp>
      ) : (
        <MdOutlineThumbUp
          title="Add to favorites"
          className="text-neu1-4 dark:text-neu1-6 min-w-[24px] hover:text-accent2 dark:hover:text-accent3"
          size="20px"
        ></MdOutlineThumbUp>
      )}
    </IconButton>
  );
};

export default GameCardLikeButton;
