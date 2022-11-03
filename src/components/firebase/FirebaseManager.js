import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setCurrentUserLikes } from "../../features/firebase/firebaseSlice";
import { auth } from "../../firebase/firebase";
import { getUserDocumentById } from "../../firebase/fireStore/firestoreQueries";

const getUserObj = user => {
  return {
    uid: user.uid,
    displayName: user.displayName,
  };
};

const FirebaseManager = () => {
  const dispatch = useDispatch();

  const loadUserLikes = async user => {
    if (!user) {
      dispatch(setCurrentUserLikes(null));
      return;
    }

    const userData = await getUserDocumentById(user.uid);
    dispatch(setCurrentUserLikes(userData?.likes || []));
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      const validUser = !!user && !!user?.displayName;

      dispatch(setCurrentUser(!!user?.displayName ? getUserObj(user) : null));
      loadUserLikes(user);
    });
  }, []);

  return null;
};

export default FirebaseManager;
