import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUserLikes, setCurrentUser } from "../features/firebase/firebaseSlice";
import { auth } from "../firebase/firebase";
import { getUserDocumentById } from "../firebase/fireStore/firestoreQueries";

const getUserObj = user => {
  return {
    uid: user.uid,
    displayName: user.displayName,
  };
};

export default () => {
  const dispatch = useDispatch();

  const loadUserLikes = async uid => {
    const userData = await getUserDocumentById(uid);
    dispatch(setCurrentUserLikes(userData?.likes || []));
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      const validUser = !!user && !!user?.displayName;
      if (!validUser) {
        dispatch(setCurrentUser(null));
        dispatch(setCurrentUserLikes(null));
        return;
      }

      dispatch(setCurrentUser(getUserObj(user)));
      loadUserLikes(user.uid);
    });
  }, []);
};
