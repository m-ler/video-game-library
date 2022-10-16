import { useLocation } from "react-router-dom";

export default Component => {
  return () => {
    return <Component key={useLocation().key}></Component>;
  };
};
