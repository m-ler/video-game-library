import { useState } from "react";
import { Modal } from "react-overlays";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdClose,
} from "react-icons/md";
import { scrollHorizontally } from "../../utils/mouseUtils";
import { useEffect } from "react";
import { useRef } from "react";

const getBackdrop = () => {
  return (
    <div className="fixed bg-black/90 top-[0] left-[0] right-[0] bottom-[0]"></div>
  );
};

const FullScreenImageSlideshow = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex || 0);
  const imageSelectorElement = useRef();



  return (
    <Modal
      className="w-screen h-screen fixed top-[0] left-[0] animate-[appear1_0.2s_ease-out]"
      keyboard={true}
      backdrop={true}
      show={true}
      onHide={() => !!props.onHide && props.onHide()}
      renderBackdrop={getBackdrop}
    >
      <div className="flex h-full">
        <button
          className="absolute top-[10px] left-[10px] rounded-full hover:bg-accent3 p-[5px] duration-200"
          onClick={() => !!props.onHide && props.onHide()}
        >
          <MdClose className="text-white" size={30}></MdClose>
        </button>
        <div className="w-full m-auto flex flex-col max-h-[100%] gap-y-[20px] py-[50px] px-[10px] md:px-[50px]">
          <div className="flex grow overflow-hidden">
            <img
              src={props.images[selectedIndex]}
              className="mx-auto object-contain"
            ></img>
          </div>
          <div
            className="max-w-full w-min mx-auto bg-white/0 min-h-[100px] max-h-[100px] overflow-auto no-scrollbar hidden md:flex p-[10px] gap-x-[10px]"
            ref={imageSelectorElement}
            onWheel={scrollHorizontally}
          >
            {!!props.images &&
              props.images.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  className={`object-scale-down max-w-[150px] cursor-pointer ${
                    selectedIndex === index
                      ? "border border-white"
                      : "opacity-50"
                  }`}
                  onClick={(e) => {
                    e.target.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                    });
                    setSelectedIndex(index);
                  }}
                ></img>
              ))}
          </div>
          <div className="w-full bg-white/20 min-h-[50px] flex md:hidden">
            <button>
              <MdKeyboardArrowLeft className="text-white"></MdKeyboardArrowLeft>
            </button>
            <div></div>
            <button>
              <MdKeyboardArrowRight className="text-white"></MdKeyboardArrowRight>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenImageSlideshow;
