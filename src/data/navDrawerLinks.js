import { FaAward, FaCrown, FaWindows, FaPlaystation, FaApple, FaAndroid, FaCode, FaGhost } from "react-icons/fa";
import { MdGames, MdSend } from "react-icons/md";
import { SiNintendo, SiSega, SiXbox } from "react-icons/si";

export const gamesLinks = [
  {
    link: "/",
    icon: <MdGames></MdGames>,
    label: "All games",
  },
  {
    link: "/",
    icon: <FaAward></FaAward>,
    label: "Best of the year",
  },
  {
    link: "/",
    icon: <FaCrown></FaCrown>,
    label: "Best of all time",
  },
];

export const platformLinks = [
  {
    link: "/",
    icon: <FaWindows></FaWindows>,
    label: "PC",
  },
  {
    link: "/",
    icon: <FaPlaystation></FaPlaystation>,
    label: "Playstation",
  },
  {
    link: "/",
    icon: <SiXbox></SiXbox>,
    label: "Xbox",
  },
  {
    link: "/",
    icon: <SiNintendo></SiNintendo>,
    label: "Nintendo",
  },
  {
    link: "/",
    icon: <SiSega></SiSega>,
    label: "Sega",
  },
  {
    link: "/",
    icon: <FaApple></FaApple>,
    label: "iOS",
  },
  {
    link: "/",
    icon: <FaAndroid></FaAndroid>,
    label: "Android",
  },
];

export const browseLinks = [
  {
    link: "/",
    icon: <FaGhost></FaGhost>,
    label: "Genres",
  },
  {
    link: "/",
    icon: <FaCode></FaCode>,
    label: "Developers",
  },
  {
    link: "/",
    icon: <MdSend></MdSend>,
    label: "Publishers",
  },
];
