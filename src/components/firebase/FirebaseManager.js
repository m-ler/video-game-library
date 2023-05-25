import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setCurrentUserLikes } from "../../slices/firebase/firebaseSlice";
import { auth } from "../../firebase/firebase";
import { getUserDocumentById } from "../../firebase/fireStore/firestoreQueries";

const getUserObj = user => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL || null,
    latestUpdateTime: Date.now(),
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
      dispatch(setCurrentUser(!!user?.displayName ? getUserObj(user) : null));
      loadUserLikes(user);

      auth.onIdTokenChanged(user => {
        dispatch(setCurrentUser(!!user?.displayName ? getUserObj(user) : null));
      });
    });
  }, []);

  return null;
};

export default FirebaseManager;
