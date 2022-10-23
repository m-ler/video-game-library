import EmptyBox from "../../assets/svgr/illustration/EmptyBox";
import PacmanGhost from "../../assets/svgr/illustration/PacmanGhost";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col">
      <PacmanGhost className="max-w-[150px] fill-neu1-5 mx-auto mb-[15px]"></PacmanGhost>
      <span className="text-center block text-neu1-8 dark:text-neu1-3 font-System font-semibold font-System text-[32px]">No games found</span>
    </div>
  );
};

export default NoResultsFound;