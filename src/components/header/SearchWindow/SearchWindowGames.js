import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHighCompressedImageURL } from "../../../utils/compressedImageURLS";

const SearchWindowGames = props => {
  const [focusedResultIndex, setFocusedResultIndex] = useState(null);
  const resultsContainer = useRef();

  const getGameListItem = (gameObj, index, onClick) => {
    return (
      <div
        key={index}
        className={`w-full flex gap-x-[20px] items-center  border-b border-neu1-2 dark:border-neu1-9 py-[10px] last:border-0 duration-200 ${
          focusedResultIndex === index ? "bg-neu1-2 dark:bg-neu1-9 rounded-bl-[10px] rounded-br-[10px] px-[10px]" : ""
        }`}
      >
        <img
          src={getHighCompressedImageURL(gameObj.background_image)}
          className="min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] object-cover rounded-md"
        ></img>
        <div className="flex flex-col grow">
          <Link
            to={`game/${gameObj.id}`}
            onClick={() => !!onClick && onClick()}
            className="text-neu1-7 dark:text-neu1-3 text-[16px] font-Lato font-semibold hover:underline"
          >
            {gameObj.name}
          </Link>
          <span className="text-neu1-5 text-[12px] font-OpenSans font-semibold">
            {(gameObj.parent_platforms || []).map(x => x.platform.name).join(", ")}
          </span>
        </div>
      </div>
    );
  };

  const handleKeyDown = e => {
    const resultsAvaliable = !!resultsContainer.current && resultsContainer.current.childElementCount > 0;
    if ((!resultsAvaliable || e.key !== "ArrowUp") && e.key !== "ArrowDown") return;
    e.preventDefault();
    e.key === "ArrowUp" && selectResult(false);
    e.key === "ArrowDown" && selectResult(true);
  };

  const selectResult = nextResult => {
    setFocusedResultIndex(current => {
      return nextResult
        ? current === resultsContainer.current.childElementCount - 1 || current == null
          ? 0
          : current + 1
        : current === 0 || current == null
        ? resultsContainer.current.childElementCount - 1
        : current - 1;
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div ref={resultsContainer}>{props.games.map((game, index) => getGameListItem(game, index, props.itemOnClick))}</div>;
};
export default SearchWindowGames;
