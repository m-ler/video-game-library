import { useState } from "react";
import { Modal } from "react-overlays";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdClose } from "react-icons/md";
import { scrollHorizontally } from "../../utils/mouseUtils";
import { useEffect } from "react";
import { useRef } from "react";

const getBackdrop = () => {
  return <div className="fixed bg-black/90 top-[0] left-[0] right-[0] bottom-[0]"></div>;
};

const FullScreenImageSlideshow = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex || 0);
  const imageSelectorElement = useRef();
  const selectedImageListElement = useRef();
  const selectedDotListElement = useRef();

  const handleKeyDown = (e) => {
    e.key === "ArrowLeft" && setSelectedIndex(selectedIndex === 0 ? props.images.length - 1 : selectedIndex - 1);
    e.key === "ArrowRight" && setSelectedIndex(selectedIndex === props.images.length - 1 ? 0 : selectedIndex + 1);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    const scrollConfig = {
      behavior: "smooth",
      inline: "center",
    };

    selectedImageListElement.current?.scrollIntoView(scrollConfig);
    selectedDotListElement.current?.scrollIntoView(scrollConfig);
  }, [selectedIndex]);

  return (
    <Modal
      className="w-screen h-screen fixed top-[0] left-[0] animate-[appear1_0.2s_ease-out]"
      keyboard={true}
      backdrop={true}
      show={true}
      onHide={() => !!props.onHide && props.onHide()}
      renderBackdrop={getBackdrop}
    >
      <div className="flex h-full" onKeyDown={handleKeyDown}>
        <button
          className="absolute top-[10px] left-[10px] rounded-full hover:bg-accent3 p-[5px] duration-200"
          onClick={() => !!props.onHide && props.onHide()}
        >
          <MdClose className="text-white" size={30}></MdClose>
        </button>
        <div className="w-full m-auto flex flex-col max-h-[100%] gap-y-[20px] py-[50px] px-[10px] md:px-[50px]">
          <div className="flex grow overflow-hidden">
            <img src={props.images[selectedIndex]} className="mx-auto object-contain"></img>
          </div>
          <div
            className="max-w-full w-min mx-auto bg-black min-h-[100px] max-h-[100px] overflow-auto no-scrollbar hidden md:flex p-[10px] gap-x-[10px]"
            ref={imageSelectorElement}
            onWheel={scrollHorizontally}
          >
            {!!props.images &&
              props.images.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  className={`object-scale-down max-w-[150px] cursor-pointer ${
                    selectedIndex === index ? "border-b border-b-[3px] border-neu1-3" : "opacity-50"
                  }`}
                  onClick={() => setSelectedIndex(index)}
                  ref={selectedIndex === index ? selectedImageListElement : null}
                ></img>
              ))}
          </div>
          <div
            className="max-w-full w-min mx-auto bg-black min-h-[20px] max-h-[100px] overflow-auto no-scrollbar flex md:hidden p-[10px] gap-x-[10px]"
            onWheel={scrollHorizontally}
          >
            {!!props.images &&
              props.images.map((img, index) => (
                <span
                  key={index}
                  className={`min-w-[15px] cursor-pointer hover:text-accent3 ${selectedIndex === index ? "text-white" : "text-white/30"}`}
                  ref={selectedIndex === index ? selectedDotListElement : null}
                  onClick={() => setSelectedIndex(index)}
                >
                  ●
                </span>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenImageSlideshow;
