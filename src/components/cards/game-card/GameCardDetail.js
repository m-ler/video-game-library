import { Link } from "react-router-dom";

const getGenres = genresList => {
  return genresList.length > 0
    ? genresList
        .map((genre, index) => (
          <Link className="hover:underline" to={`/genres/${genre.slug}`} key={index}>
            {genre.name}
          </Link>
        ))
        .reduce((prev, curr) => [prev, ", ", curr])
    : "";
};

const getAllPlatforms = platformList => {
  return platformList?.length > 0
    ? platformList
        .map((platform, index) => (
          <Link className="hover:underline" to={`/games?platform=${platform.platform.slug}`} key={index}>
            {platform.platform.name}
          </Link>
        ))
        .reduce((prev, curr) => [prev, ", ", curr])
    : "";
};

const GameCardDetail = props => {
  return (
    <div
      className={`absolute top-[calc(100%-20px)] left-[0px] right-[0px] min-h-[50px] flex flex-col gap-y-[10px] z-10 shadow-lg transition duration-200 
      p-[20px] backdrop-blur-xl bg-neu1-1/80 dark:bg-neu1-9/80 z-0 rounded-b-[10px] origin-top ${props.className || ""}`}
    >
      <div className="border-t border-neu1-4 dark:border-neu1-6 block w-full pt-[10px] z-10">
        <span className="font-Lato font-bold text-[16px] block text-neu1-7 dark:text-neu1-3">Genres</span>
        <span className="font-OpenSans font-semibold text-[14px] text-neu2-6 dark:text-neu2-4">{getGenres(props.game.genres)}</span>
      </div>

      <div className="border-t border-neu1-4 dark:border-neu1-6 block w-full pt-[10px] z-10">
        <span className="font-Lato font-bold text-[16px] block text-neu1-7 dark:text-neu1-3">All platforms</span>
        <span className="font-OpenSans font-semibold text-[14px] text-neu2-6 dark:text-neu2-4">
          {getAllPlatforms(props.game.platforms)}
        </span>
      </div>
    </div>
  );
};

export default GameCardDetail;
