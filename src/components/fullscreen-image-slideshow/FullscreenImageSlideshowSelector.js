import { useRef, useEffect } from 'react';
import { scrollHorizontally } from '../../utils/mouseUtils';

const FullscreenImageSlideshowSelector = props => {
	const imageSelectorElement = useRef();
	const selectedImageListElement = useRef();
	const selectedDotListElement = useRef();

	useEffect(() => {
		const scrollConfig = {
			behavior: 'smooth',
			inline: 'center',
		};

		selectedImageListElement.current?.scrollIntoView(scrollConfig);
		selectedDotListElement.current?.scrollIntoView(scrollConfig);
	}, [props.selectedIndex]);

	return (
		<div>
			<div
				className="max-w-full w-min mx-auto bg-black min-h-[100px] max-h-[100px] overflow-auto no-scrollbar flex md:hidden p-[10px] gap-x-[10px]"
				ref={imageSelectorElement}
				onWheel={scrollHorizontally}
				data-testid="image-list-slideshow"
			>
				{props.images.map((img, index) => (
					<img
						alt=""
						src={img}
						key={index}
						className={`object-scale-down max-w-[150px] cursor-pointer select-none ${
							props.selectedIndex === index ? 'border-b border-b-[3px] border-neu1-3' : 'opacity-50'
						}`}
						onClick={() => props.onSelectImage(index)}
						ref={props.selectedIndex === index ? selectedImageListElement : null}
					></img>
				))}
			</div>
			<div
				className="max-w-full w-min mx-auto bg-black min-h-[20px] max-h-[100px] overflow-auto no-scrollbar hidden md:flex p-[10px] gap-x-[10px]"
				onWheel={scrollHorizontally}
			>
				{props.images.map((img, index) => (
					<span
						key={index}
						className={`min-w-[15px] cursor-pointer hover:text-accent3 ${props.selectedIndex === index ? 'text-white' : 'text-white/30'}`}
						ref={props.selectedIndex === index ? selectedDotListElement : null}
						onClick={() => props.onSelectImage(index)}
					>
						●
					</span>
				))}
			</div>
		</div>
	);
};

export default FullscreenImageSlideshowSelector;
