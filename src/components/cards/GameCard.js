import { cloneElement } from "react";
import { FaWindows, FaLinux, FaPlaystation, FaXbox, FaApple, FaChrome } from "react-icons/fa";
import { SiNintendoswitch, SiIos, SiSega } from "react-icons/si";
import { DiAndroid } from "react-icons/di";
import GameCardDetail from "./GameCardDetail";
import { useState } from "react";
import { getMidCompressedImageURL } from "../../utils/compressedImageURLS";
import GameCardSlideshow from "./GameCardSlideshow";
import { Link } from "react-router-dom";

const platformIconDictionary = {
  "PC": <FaWindows></FaWindows>,
  "Linux": <FaLinux></FaLinux>,
  "PlayStation": <FaPlaystation></FaPlaystation>,
  "Xbox": <FaXbox></FaXbox>,
  "Nintendo": <SiNintendoswitch></SiNintendoswitch>,
  "SEGA": <SiSega></SiSega>,
  "Apple Macintosh": <FaApple></FaApple>,
  "iOS": <SiIos></SiIos>,
  "Android": <DiAndroid></DiAndroid>,
  "Web": <FaChrome></FaChrome>,
};

const getPlatformIconList = platforms => {
  const iconList = [];
  platforms.map((platform, index) => {
    const icon = platformIconDictionary[platform];
    iconList.push(!!icon ? cloneElement(icon, { key: index, className: "min-w-[15px]", size: "15px" }) : platform);
  });
  return iconList;
};

const getMetascoreColor = score => (score > 74 ? "text-metascore-high" : score > 49 ? "text-metascore-mid" : "text-metascore-low");
const getBgMetascoreColor = score => (score > 74 ? "bg-metascore-high/20" : score > 49 ? "bg-metascore-mid/20" : "bg-metascore-low/20");

const GameCard = props => {
  const [hovering, setHovering] = useState(false);

  const platforms = props.game?.parent_platforms?.map(platform => platform.platform.name);
  const platformIcons = getPlatformIconList(platforms);
  const metascore = props.game.metacritic;

  return (
    <div
      data-rol="game-card"
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      data-game-id={props.game.id}
      style={props.style}
      className={`flex flex-col bg-neu1-1 dark:bg-neu1-9 min-h-[317px] max-h-[317px] ${
        hovering ? "shadow-lg" : "shadow-md"
      } rounded-xl gap-y-[15px] animate-[fadeIn_0.3s_ease-out] relative`}
    >
      <GameCardSlideshow game={props.game} style={{ display: hovering ? "block" : "none" }}></GameCardSlideshow>
      <img
        loading="lazy"
        src={getMidCompressedImageURL(props.game.background_image)}
        className={`max-h-[200px] min-h-[200px] object-cover rounded-tr-lg rounded-tl-lg cursor-pointer bg-neu1-1 dark:bg-neu1-10 ${
          hovering ? "hidden" : "block"
        }`}
      ></img>

      <div className="flex flex-col gap-y-[5px] px-[20px] pb-[20px]">
        <Link
          to={`/game/${props.game.slug}`}
          className={`text-neu1-9 dark:text-neu1-2 font-Roboto font-black text-[20px] text-ellipsis overflow-hidden block ${
            hovering ? "" : "whitespace-nowrap"
          } hover:underline`}
        >
          {props.game.name}
        </Link>
        <div className="grid grid-cols-[1fr_30px] gap-y-[5px] grid-rows-[1fr_1fr] gap-x-[15px] items-center">
          <span
            className="flex gap-[10px] overflow-hidden text-neu1-6 dark:text-neu1-4 font-OpenSans font-medium text-[16px] relative after:content-[''] 
                        after:absolute after:top-[0] after:right-[0] after:left-[0] after:bottom-[0] after:bg-[linear-gradient(to_left,_#F5F7FA_0%,_transparent_20px)]
                        dark:after:bg-[linear-gradient(to_left,_#323F4B_0%,_transparent_20px)]"
          >
            {platformIcons}
          </span>
          {!!metascore ? (
            <span
              title="Metascore"
              className={`py-[5px] col-[2/3] row-[1/3] font-Roboto font-black rounded-md text-center ${getMetascoreColor(
                metascore
              )} ${getBgMetascoreColor(metascore)} text-[14px]`}
            >
              {metascore}
            </span>
          ) : (
            <span></span>
          )}

          <span className="text-neu1-5 dark:text-neu1-5 font-OpenSans font-medium text-[14px]">
            {new Date(props.game.released).getFullYear()}
          </span>
        </div>
      </div>
      {
        <GameCardDetail
          game={props.game}
          className={`${hovering ? "scale-y-100 ease-outBack opacity-100 visible" : "scale-y-0 ease-inBack opacity-0"}`}
        ></GameCardDetail>
      }
    </div>
  );
};

export default GameCard;
