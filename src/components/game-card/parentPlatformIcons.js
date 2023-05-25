import { FaWindows, FaLinux, FaPlaystation, FaXbox, FaApple } from "react-icons/fa";
import { SiAtari, SiIos, SiSega } from "react-icons/si";
import { DiAndroid } from "react-icons/di";

import NintendoIcon from "../../assets/svgr/platform-icons/NintendoIcon";
import CommodoreAmigaIcon from "../../assets/svgr/platform-icons/CommodoreAmigaIcon";
import Console3DOIcon from "../../assets/svgr/platform-icons/Console3DOIcon";
import NeoGeoIcon from "../../assets/svgr/platform-icons/NeoGeoIcon";
import BrowserIcon1 from "../../assets/svgr/platform-icons/BrowserIcon1";

export default {
  "PC": <FaWindows></FaWindows>,
  "Linux": <FaLinux></FaLinux>,
  "PlayStation": <FaPlaystation></FaPlaystation>,
  "Xbox": <FaXbox></FaXbox>,
  "Nintendo": <NintendoIcon></NintendoIcon>,
  "SEGA": <SiSega></SiSega>,
  "Apple Macintosh": <FaApple></FaApple>,
  "iOS": <SiIos></SiIos>,
  "Android": <DiAndroid></DiAndroid>,
  "Web": <BrowserIcon1></BrowserIcon1>,
  "Atari": <SiAtari></SiAtari>,
  "Commodore / Amiga": <CommodoreAmigaIcon></CommodoreAmigaIcon>,
  "3DO": <Console3DOIcon></Console3DOIcon>,
  "Neo Geo": <NeoGeoIcon></NeoGeoIcon>,
};
