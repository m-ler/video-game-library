import { useEffect, useState } from "react";
import { FaAward, FaCrown, FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaCode, FaGhost } from "react-icons/fa";
import { MdGames, MdDashboard } from "react-icons/md";
import { SiNintendo, SiSega } from "react-icons/si";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

const NavigationDrawer = () => {
  const [selectedMenu, setSelectedMenu] = useState();

  return (
    <aside
      id="nav-drawer"
      className="bg-gradient-to-l from-black/10 h-full px-[20px] overflow-auto flex flex-col gap-y-[5px] duration-100 basis-[300px]"
    >
      <h3 className="text-neu1-4 font-Raleway font-semibold text-[16px] border-b border-b-neu1-8 my-[20px] pb-[5px] mb-[5px]">GAMES</h3>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200 pb-[5px]">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200">
          <MdGames className="text-neu1-1  group-hover:text-accent1  duration-200"></MdGames>
        </span>
        <h3 className="text-neu1-1 font-System font-medium text-[16px]">All games</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200 pb-[5px]">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200">
          <FaAward className="text-neu1-3  group-hover:text-accent1  duration-200"></FaAward>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Best of the year</h3>
      </Link>
      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaCrown className="text-neu1-3  group-hover:text-accent1  duration-200"></FaCrown>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Best of all time</h3>
      </Link>

      <h3 className="text-neu1-4 font-Raleway font-semibold text-[16px] border-b border-b-neu1-8 my-[20px] pb-[5px] mb-[5px]">PLATFORMS</h3>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaWindows className="text-neu1-3  group-hover:text-accent1 duration-200"></FaWindows>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">PC</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaPlaystation className="text-neu1-3  group-hover:text-accent1 duration-200"></FaPlaystation>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">PlayStation</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaXbox className="text-neu1-3  group-hover:text-accent1 duration-200"></FaXbox>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Xbox</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <SiNintendo className="text-neu1-3  group-hover:text-accent1 duration-200"></SiNintendo>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Nintendo</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <SiSega className="text-neu1-3  group-hover:text-accent1 duration-200"></SiSega>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Sega</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaApple className="text-neu1-3  group-hover:text-accent1 duration-200"></FaApple>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">iOS</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaAndroid className="text-neu1-3  group-hover:text-accent1 duration-200"></FaAndroid>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Android</h3>
      </Link>

      <h3 className="text-neu1-4 font-Raleway font-semibold text-[16px] border-b border-b-neu1-8 my-[20px] pb-[5px] mb-[5px]">BROWSE</h3>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaGhost className="text-neu1-3  group-hover:text-accent1 duration-200"></FaGhost>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Genres</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <FaCode className="text-neu1-3  group-hover:text-accent1 duration-200"></FaCode>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Developers</h3>
      </Link>

      <Link to="/" className="group flex items-center gap-x-[7px] duration-200">
        <span className="group-hover:p-[5px] group-hover:bg-neu1-3 rounded-md duration-200 ">
          <IoIosSend className="text-neu1-3  group-hover:text-accent1 duration-200"></IoIosSend>
        </span>
        <h3 className="text-neu1-3 font-System font-normal text-[16px]">Publishers</h3>
      </Link>
    </aside>
  );
};;

export default NavigationDrawer;
