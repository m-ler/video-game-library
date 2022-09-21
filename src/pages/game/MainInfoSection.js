import { useState } from "react";
import { getMidCompressedImageURL } from "../../utils/compressedImageURLS";
import FullScreenImageSlideshow from "./FullScreenImageSlideshow";

export default (props) => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const getImagePreview = (url, key) => {
    return (
      <img
        className="cursor-zoom-in w-full rounded-md"
        key={key}
        src={getMidCompressedImageURL(url)}
        onClick={() => {
          setSelectedImage(key);
          setShowSlideshow(true);
        }}
      ></img>
    );
  };

  return (
    <section className="z-[2] relative mx-auto max-w-[1000px] flex flex-wrap justify-between gap-[20px] border-b border-neu1-3 dark:border-neu1-7 pb-[20px]">
      <div className="min-w-[min(100%,400px)] max-w-[490px] mx-auto">
        <h1 className="text-neu1-9 dark:text-neu1-1 font-System text-[48px] font-black mb-[25px] leading-[50px]">
          {props.game.name}
        </h1>
        <div className="bg-neu1-1/20 dark:bg-neu1-10/20 p-[15px] rounded-md backdrop-blur-xl shadow-lg max-h-[433px] overflow-auto">
          <h3 className="text-neu1-9 dark:text-neu1-2 font-Lato font-black text-[20px] mb-[10px]">
            Description
          </h3>
          <p className="text-neu1-7 dark:text-neu1-3 font-Roboto font-medium text-[14px]">
            {props.game.description_raw}
          </p>
        </div>
      </div>

      {!props.screenshots ? (
        ""
      ) : (
        <div
          className="bg-neu1-1/20 dark:bg-neu1-10/20 backdrop-blur-xl shadow-lg min-w-[min(100%,400px)] max-w-[490px] gap-[15px] mx-auto grow overflow-auto box-border p-[15px] rounded-md grid mt-auto"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(min(200px, 100%), 1fr))`,
          }}
        >
          {props.screenshots.map((img, index) =>
            getImagePreview(img.image, index)
          )}
        </div>
      )}

      {showSlideshow && (
        <FullScreenImageSlideshow
          images={props.screenshots.map((x) => x.image)}
          onHide={() => setShowSlideshow(false)}
          selectedIndex={selectedImage}
        ></FullScreenImageSlideshow>
      )}
    </section>
  );
};
