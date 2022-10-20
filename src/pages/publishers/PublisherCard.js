import { Link } from "react-router-dom";
import { getMidCompressedImageURL } from "../../utils/compressedImageURLS";

const PublisherCard = props => {
  return (
    <div
      className="bg-neu1-1 dark:bg-neu1-9 w-full h-full animate-[fadeIn_0.3s_ease-out] flex rounded-lg items-center p-[20px] relative z-[0] overflow-hidden 
      rounded-lg gap-x-[20px]"
    >
      <img
        src={getMidCompressedImageURL(props.publisher.image_background)}
        className="object-cover aspect-square max-w-[80px] rounded-full"
      ></img>
      <div className="flex flex-col justify-center">
        <Link
          className="text-[16px] font-bold font-OpenSans text-neu1-9 dark:text-neu1-2 block hover:underline leading-6 line-clamp-2"
          to={`/publishers/${props.publisher.slug}`}
        >
          {props.publisher.name}
        </Link>
        <span title="Game count" className="font-normal text-[14px] text-neu1-5 dark:text-neu1-4  ">
          {props.publisher.games_count}
        </span>
      </div>
    </div>
  );
};
export default PublisherCard;
