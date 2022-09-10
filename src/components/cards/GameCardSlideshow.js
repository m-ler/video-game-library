import { useState } from "react";
import getCompressedImageURL from "../../utils/getCompressedImageURL";



const GameCardSlideshow = (props) => {
    
    const [hoverIndex, setHoverIndex] = useState(0);

    const getGameImages = (imageList) => {
        const style = `object-cover absolute w-full h-full flex rounded-[12px]`;
        const images = imageList.map((x, i) => <img loading="lazy" key={i} src={getCompressedImageURL(x.image)} style={{display: hoverIndex === i ? 'block' : 'none'}} className={style}></img>);
        return images;
    };

    const imageList = getGameImages(props.game.short_screenshots);

    return (
        <div className="max-h-[200px] min-h-[200px] relative rounded-[10px] overflow-hidden ">
            {imageList}
            <div className="absolute w-full h-full flex justify-between
             before:content-[''] before:z-10 before:absolute before:top-[0px] before:left-[0px] before:right-[0px] before:bottom-[0px]  before:bg-[linear-gradient(to_top,_black_0%,_transparent_100px)] before:opacity-80 before:pointer-events-none">
                {new Array(imageList.length).fill().map((x, i) => <div key={i} onMouseEnter={() => setHoverIndex(i)} className="grow flex z-20"><span className={`mt-auto mx-auto bg-white w-[60%] mb-[10px] h-[3px] ${hoverIndex === i ? 'opacity-80' : 'opacity-30'} rounded-[50px]`}></span></div>)}
            </div>
        </div>
    );
};

export default GameCardSlideshow;