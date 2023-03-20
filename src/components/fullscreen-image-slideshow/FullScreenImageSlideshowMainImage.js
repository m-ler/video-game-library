import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const FullScreenImageSlideshowMainImage = props => {
	return (
		<div className="flex grow overflow-hidden relative" data-testid="slideshow-main-image-section">
			<span
				tabIndex={-1}
				className="absolute top-[0] h-full w-[25%] block cursor-pointer bg-gradient-to-r hover:from-black/50 duration-300 group outline-0 flex items-center"
				onClick={props.leftButtonOnClick}
				data-testid="select-prev-image"
			>
				<MdKeyboardArrowLeft className="text-white opacity-0  group-hover:opacity-100 pl-1.5" size={40}></MdKeyboardArrowLeft>
			</span>
			<img src={props.image} className="mx-auto object-contain select-none" alt="" data-testid="selected-image-slideshow"></img>
			<span
				tabIndex={-1}
				className="absolute top-[0] right-[0] h-full block cursor-pointer w-[25%] bg-gradient-to-l hover:from-black/50 duration-300 group outline-0 flex items-center"
				onClick={props.rightButtonOnClick}
				data-testid="select-next-image"
			>
				<MdKeyboardArrowRight className="text-white opacity-0 ml-auto  group-hover:opacity-100 pr-1.5" size={40}></MdKeyboardArrowRight>
			</span>
		</div>
	);
};

export default FullScreenImageSlideshowMainImage;
