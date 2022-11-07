import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = props => {
  const currentUser = useSelector(state => state.firebase.currentUser);
  const allow = props.onlyUsers ? !!currentUser : props.onlyAnonymous ? !currentUser : false;
  console.log(currentUser);
  return allow ? props.children : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
