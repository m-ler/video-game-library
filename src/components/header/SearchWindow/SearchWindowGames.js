import { Link } from "react-router-dom";
import { getHighCompressedImageURL } from "../../../utils/compressedImageURLS";

const getGameListItem = (gameObj, index, onClick) => {
  return (
    <div key={index} className="w-full flex gap-x-[20px] items-center mb-[10px] border-b border-neu1-3 dark:border-neu1-9 pb-[10px] last:border-0">
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

const SearchWindowGames = props => {
  return <div>{props.games.map((game, index) => getGameListItem(game, index, props.itemOnClick))}</div>;
};
export default SearchWindowGames;
