import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavigationDrawer = () => {
  return (
    <aside id="nav-drawer" className="h-full p-[20px] overflow-auto flex flex-col gap-y-[20px] duration-100 basis-[300px]">
      <div className="">
        <Link to="/" className="text-neu1-2 font-System font-bold text-[24px] hover:underline">
          All Games
        </Link>
      </div>

      <div className="">
        <h3 className="text-neu1-2 font-System font-bold text-[24px]">Top</h3>
      </div> 

      <div className="">
        <h3 className="text-neu1-2 font-System font-bold text-[24px]">Platforms</h3>
      </div>

      <div className="">
        <h3 className="text-neu1-2 font-System font-bold text-[24px]">Genres</h3>
      </div>
    </aside>
  );
};
 
export default NavigationDrawer;
