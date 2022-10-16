import { FaAward, FaCrown, FaWindows, FaPlaystation, FaApple, FaAndroid, FaCode, FaGhost } from "react-icons/fa";
import { MdGames, MdSend } from "react-icons/md";
import { SiNintendo, SiSega, SiXbox } from "react-icons/si";

export const gamesLinks = [
  {
    routes: ["/games/all", "/"],
    icon: <MdGames></MdGames>,
    name: "All games",
  },
  {
    routes: [],
    icon: <FaAward></FaAward>,
    name: "Best of the year",
  },
  {
    routes: [],
    icon: <FaCrown></FaCrown>,
    name: "Best of all time",
  },
];

export const platformLinks = [
  {
    routes: ["/games/pc"],
    icon: <FaWindows></FaWindows>,
    name: "PC",
  },
  {
    routes: [
      "/games/playstation",
      "/games/playstation5",
      "/games/playstation4",
      "/games/playstation3",
      "/games/playstation2",
      "/games/playstation1",
      "/games/ps-vita",
      "/games/psp",
    ],
    icon: <FaPlaystation></FaPlaystation>,
    name: "Playstation",
  },
  {
    routes: ["/games/xbox", "/games/xbox-one", "/games/xbox-series-x", "/games/xbox360", "/games/xbox-old"],
    icon: <SiXbox></SiXbox>,
    name: "Xbox",
  },
  {
    routes: [
      "/games/nintendo",
      "/games/nintendo-switch",
      "/games/nintendo-3ds",
      "/games/nintendo-ds",
      "/games/nintendo-dsi",
      "/games/wii-u",
      "/games/wii",
      "/games/gamecube",
      "/games/nintendo-64",
      "/games/game-boy-advance",
      "/games/game-boy-color",
      "/games/game-boy",
      "/games/snes",
      "/games/nes",
    ],
    icon: <SiNintendo></SiNintendo>,
    name: "Nintendo",
  },
  {
    routes: [
      "/games/sega",
      "/games/genesis",
      "/games/sega-saturn",
      "/games/sega-cd",
      "/games/sega-32x",
      "/games/sega-master-system",
      "/games/dreamcast",
      "/games/game-gear",
    ],
    icon: <SiSega></SiSega>,
    name: "Sega",
  },
  {
    routes: ["/games/ios"],
    icon: <FaApple></FaApple>,
    name: "iOS",
  },
  {
    routes: ["games/android"],
    icon: <FaAndroid></FaAndroid>,
    name: "Android",
  },
];

export const browseLinks = [
  {
    routes: [],
    icon: <FaGhost></FaGhost>,
    name: "Genres",
  },
  {
    routes: [],
    icon: <FaCode></FaCode>,
    name: "Developers",
  },
  {
    routes: [],
    icon: <MdSend></MdSend>,
    name: "Publishers",
  },
];
