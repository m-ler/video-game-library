import { useEffect } from "react";
import { useState } from "react";
import { useRef, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import withOverlay from "../../hoc/overlays/withOverlay";
import GamesSortByMenu from "./GamesSortByMenu";

const GamesOrderButton = () => {
  const [showOrderByMenu, setShowOrderByMenu] = useState(true);
  const botonRef = useRef(null);

  const GamesSortByMenuWithOverlay = useMemo(
    () =>
      withOverlay(GamesSortByMenu, {
        elementTarget: botonRef.current,
        position: "bottom-left",
        anchor: "top-left",
        margin: { x: 0, y: 15 },
        sameWidth: true,
        autoClose: false
      }),
    [botonRef.current]
  );

  useEffect(() => {console.log("boton ref changed"); console.log(botonRef.current)}, [botonRef.current]);

  return (
    <button ref={botonRef} className="flex items-center gap-x-[10px] px-[12px] py-[8px] rounded-md bg-white">
      <span className="font-Raleway font-medium text-[13px] text-neu1-9">Order by: </span>
      <span className="font-System font-bold text-[14px] text-neu1-10">Popularity</span>
      <IoIosArrowDown></IoIosArrowDown>
      <GamesSortByMenuWithOverlay show={showOrderByMenu} setShow={setShowOrderByMenu}></GamesSortByMenuWithOverlay>
    </button>
  );
};

export default GamesOrderButton;
