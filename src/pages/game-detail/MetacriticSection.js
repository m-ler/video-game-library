import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import MetacriticIcon from "../../assets/icons/MetacriticIcon";
import getMetascoreColor from "../../utils/getMetascoreColor";

const MetacriticSection = props => {
  const theme = useSelector(state => state.theme);

  return (
    <div className="mx-auto max-w-min bg-neu1-1 dark:bg-neu1-9 mt-[20px] rounded flex flex-col p-[15px] gap-x-[15px] items-center">
      <div className="flex items-center justify-center gap-x-[10px]">
        <span
          className={`flex items-center text-center ${getMetascoreColor(
            props.score
          )} text-white font-System font-black text-[20px] p-[7px] max-h-[40px] max-w-[40px] rounded`}
        >
          {props.score}
        </span>
        <MetacriticIcon width={150} color={theme === "dark" ? "white" : "black"}></MetacriticIcon>
      </div>
      {!!props.metacriticURL && (
        <a
          target="blank"
          href={props.metacriticURL}
          className="flex items-center gap-x-[10px] text-neu1-8 dark:text-neu1-2 hover:underline font-Raleway text-[12px] font-bold ml-auto"
        >
          Read reviews
          <FaExternalLinkAlt className="max-w-[10px]"></FaExternalLinkAlt>
        </a>
      )}
    </div>
  );
};

export default MetacriticSection;
