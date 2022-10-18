import { useLocation } from "react-router-dom";

export default Component => {
  return props => {
    return <Component key={useLocation().key} {...props}></Component>;
  };
};
