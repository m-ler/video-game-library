import EmptyBox from "../../assets/svgr/illustration/EmptyBox";
import PacmanGhost from "../../assets/svgr/illustration/PacmanGhost";

const NoResultsFound = props => {
  return (
    <div className="flex flex-col mt-[20px]">
      <PacmanGhost className="max-w-[150px] fill-accent2 dark:fill-accent3 mx-auto mb-[15px]"></PacmanGhost>
      <span className="text-center block text-neu1-8 dark:text-neu1-3 font-System font-black font-System text-[32px]">No results</span>
      <span className="text-center text-[18px] font-medium text-neu1-5">{props.message}</span>
    </div>
  );
};

export default NoResultsFound;