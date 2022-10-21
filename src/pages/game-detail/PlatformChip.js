import { cloneElement } from "react";
import { Link } from "react-router-dom";
import platformColors from "../../data/platformColors";
import platformIcons from "../../data/platformIcons";

export default props => {
  const platformColor = platformColors[props.plaformName] || "#000";
  const platformIcon = platformIcons[props.plaformName] || null;

  return (
    <Link
      to={`/games?platform=${props.platformSlug}`}
      className="px-[20px] py-[8px] rounded flex items-center gap-x-[10px] hover:scale-105 hover:drop-shadow-lg duration-100 w-max"
      style={{ backgroundColor: platformColor }}
    >
      {platformIcon &&
        cloneElement(platformIcon, {
          className: "text-white h-[1em] ",
          color: "white",
        })}
      <span className="font-OpenSans text-white font-semibold text-[14px] whitespace-nowrap">{props.plaformName}</span>
    </Link>
  );
};
