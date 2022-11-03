import { FaAward, FaCrown, FaWindows, FaPlaystation, FaApple, FaAndroid, FaCode, FaGhost, FaGamepad } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { MdGames, MdThumbUp } from "react-icons/md";
import { SiNintendo, SiSega, SiXbox } from "react-icons/si";

export const gamesLinks = [
  {
    route: "/games",
    icon: <MdGames></MdGames>,
    name: "All games",
    linkIsSelected: (pathname, search) => (pathname === "/games" && !search) || (pathname === "/games" && search.includes("platform=all")),
  },
  {
    route: "/games/best-of-the-year",
    icon: <FaAward></FaAward>,
    name: "Best of the year",
    linkIsSelected: pathname => pathname === "/games/best-of-the-year",
  },
  {
    route: "/games/best-of-all-time",
    icon: <FaCrown></FaCrown>,
    name: "Best of all time",
    linkIsSelected: pathname => pathname === "/games/best-of-all-time",
  },
];

export const platformLinks = [
  {
    route: "/games?platform=pc",
    icon: <FaWindows></FaWindows>,
    name: "PC",
    linkIsSelected: (pathname, search) => pathname === "/games" && search.includes("platform=pc"),
  },
  {
    route: "/games?platform=playstation",
    icon: <FaPlaystation></FaPlaystation>,
    name: "Playstation",
    linkIsSelected: (pathname, search) => {
      return (
        pathname === "/games" &&
        ["playstation", "playstation5", "playstation4", "playstation2", "playstation1", "playstation", "ps-vita", "psp"].some(x =>
          search.includes(`platform=${x}`)
        )
      );
    },
  },
  {
    route: "/games?platform=xbox",
    icon: <SiXbox></SiXbox>,
    name: "Xbox",
    linkIsSelected: (pathname, search) => {
      return (
        pathname === "/games" && ["xbox", "xbox-one", "xbox-series-x", "xbox360", "xbox-old"].some(x => search.includes(`platform=${x}`))
      );
    },
  },
  {
    route: "/games?platform=nintendo",
    icon: <SiNintendo></SiNintendo>,
    name: "Nintendo",
    linkIsSelected: (pathname, search) => {
      return (
        pathname === "/games" &&
        [
          "nintendo",
          "nintendo-switch",
          "nintendo-3ds",
          "nintendo-ds",
          "nintendo-dsi",
          "wii-u",
          "wii",
          "gamecube",
          "nintendo-64",
          "game-boy-advance",
          "game-boy-color",
          "game-boy",
          "snes",
          "nes",
        ].some(x => search.includes(`platform=${x}`))
      );
    },
  },
  {
    route: "/games?platform=sega",
    icon: <SiSega></SiSega>,
    name: "Sega",
    linkIsSelected: (pathname, search) => {
      return (
        pathname === "/games" &&
        ["sega", "genesis", "sega-saturn", "sega-cd", "sega-32x", "sega-master-system", "dreamcast", "game-gear"].some(x =>
          search.includes(`platform=${x}`)
        )
      );
    },
  },
  {
    route: "/games?platform=ios",
    icon: <FaApple></FaApple>,
    name: "iOS",
    linkIsSelected: (pathname, search) => pathname === "/games" && search.includes("platform=ios"),
  },
  {
    route: "/games?platform=android",
    icon: <FaAndroid></FaAndroid>,
    name: "Android",
    linkIsSelected: (pathname, search) => pathname === "/games" && search.includes("platform=android"),
  },
];

export const browseLinks = [
  {
    route: "/platforms",
    icon: <FaGamepad></FaGamepad>,
    name: "Platforms",
    linkIsSelected: (pathname, search) => pathname.includes("/platforms"),
  },
  {
    route: "/genres",
    icon: <FaGhost></FaGhost>,
    name: "Genres",
    linkIsSelected: (pathname, search) => pathname.includes("/genres"),
  },
  {
    route: "/developers",
    icon: <FaCode></FaCode>,
    name: "Developers",
    linkIsSelected: (pathname, search) => pathname.includes("/developers"),
  },
  {
    route: "/publishers",
    icon: <IoIosRocket></IoIosRocket>,
    name: "Publishers",
    linkIsSelected: (pathname, search) => pathname.includes("/publishers"),
  },
];

export const favoritesLink = {
  route: "/favorites",
  icon: <MdThumbUp></MdThumbUp>,
  name: "Favorites",
  linkIsSelected: (pathname, search) => pathname.includes("/favorites"),
};
