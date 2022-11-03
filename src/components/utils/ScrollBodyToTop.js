import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollBodyToTop = () => {
  const { key } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });

  }, [key]);

  return null;
};

export default ScrollBodyToTop;
