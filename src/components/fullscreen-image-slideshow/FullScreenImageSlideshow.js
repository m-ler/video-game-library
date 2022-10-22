import { useState } from "react";
import { Modal } from "react-overlays";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import FullScreenImageSlideshowInvalid from "./FullScreenImageSlideshowInvalid";
import FullScreenImageSlideshowMainImage from "./FullScreenImageSlideshowMainImage";
import FullscreenImageSlideshowSelector from "./FullscreenImageSlideshowSelector";

const getBackdrop = () => {
  return <div className="fixed bg-black/90 top-[0] left-[0] right-[0] bottom-[0] z-10"></div>;
};

const FullScreenImageSlideshow = props => {
  const imagesAreValid = !!props.images && Array.isArray(props.images) && props.images.length > 0;
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex || 0);

  const handleKeyDown = e => {
    e.key === "ArrowLeft" && selectImage(false, "arrow left");
    e.key === "ArrowRight" && selectImage(true, "arrow right");
  };

  const selectImage = nextImage => {
    nextImage
      ? setSelectedIndex(selectedIndex === props.images.length - 1 ? 0 : selectedIndex + 1)
      : setSelectedIndex(selectedIndex === 0 ? props.images.length - 1 : selectedIndex - 1);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Modal
      className="w-screen h-screen fixed top-[0] left-[0] animate-[appear1_0.2s_ease-out] z-10"
      keyboard={true}
      backdrop={true}
      show={true}
      onHide={() => !!props.onHide && props.onHide()}
      renderBackdrop={getBackdrop}
    >
      <div className="flex h-full">
        <button
          className="absolute top-[10px] right-[10px] rounded-full hover:bg-accent3 p-[5px] duration-200"
          onClick={() => !!props.onHide && props.onHide()}
        >
          <MdClose className="text-white" size={30}></MdClose>
        </button>
        <div className="w-full m-auto flex flex-col max-h-[100%] gap-y-[20px] py-[50px] px-[10px] md:px-[50px]">
          {imagesAreValid ? (
            <FullScreenImageSlideshowMainImage
              leftButtonOnClick={() => selectImage(false)}
              rightButtonOnClick={() => selectImage(true)}
              image={props.images[selectedIndex]}
            ></FullScreenImageSlideshowMainImage>
          ) : (
            <FullScreenImageSlideshowInvalid></FullScreenImageSlideshowInvalid>
          )}

          {imagesAreValid && (
            <FullscreenImageSlideshowSelector
              selectedIndex={selectedIndex}
              images={props.images}
              onSelectImage={index => setSelectedIndex(index)}
            ></FullscreenImageSlideshowSelector>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenImageSlideshow;
