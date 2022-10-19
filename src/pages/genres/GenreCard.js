import { Link } from "react-router-dom";
import { getMidCompressedImageURL } from "../../utils/compressedImageURLS";

const GenreCard = props => {
  return (
    <div className="flex flex-col animate-[fadeIn.3s_ease-out] relative z-0 rounded-lg">
      <img className="rounded-tl-lg rounded-tr-lg" src={getMidCompressedImageURL(props.genre.image_background)}></img>
      <div className="flex flex-col bg-neu1-1 dark:bg-neu1-9 p-[15px] rounded-bl-lg rounded-br-lg grow justify-center">
        <Link
          to={`/genres/${props.genre.slug}`}
          className="text-neu1-8 dark:text-neu1-2 text-center hover:underline font-System font-bold text-[18px] mb-[10px]"
        >
          {props.genre.name}
        </Link>
        <span
          title="Game count"
          className="text-center text-[12px] font-OpenSans font-semibold text-neu1-6 dark:text-neu1-4 px-[10px] py-[5px] bg-neu1-2 dark:bg-neu1-8 rounded-md w-fit mx-auto"
        >
          {props.genre.games_count}
        </span>
      </div>
    </div>
  );
};

export default GenreCard;
