import { cloneElement } from "react";
import { Link } from "react-router-dom";
import platformColors from "../../utils/platformColors";
import platformIcons from "../../utils/platformIcons";

export default (props) => {
    const platformColor = platformColors[props.plaformName] || '#000';
    const platformIcon = platformIcons[props.plaformName] || null;

    return (
        <Link to='/' className="px-[20px] py-[8px] rounded flex items-center gap-x-[10px] hover:scale-105 hover:drop-shadow-lg duration-100 "
            style={{ backgroundColor: platformColor}}
        >
            {platformIcon && cloneElement(platformIcon, { className: "text-white" })}
            <span className="font-OpenSans text-white font-semibold text-[14px]">{props.plaformName}</span>
        </Link>
    )
}
