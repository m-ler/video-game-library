import { useEffect } from "react";

export default (refs, onClickOutside) => {
  useEffect(() => {
    const listener = event => {
      if (refs.some(ref => !ref.current || ref.current.contains(event.target))) return;
      onClickOutside(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, onClickOutside]);
};
