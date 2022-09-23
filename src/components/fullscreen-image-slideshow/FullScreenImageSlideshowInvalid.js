import { MdOutlineHideImage } from "react-icons/md";


const FullScreenImageSlideshowInvalid = () => {
  return (
    <div className='w-full p-[10px] min-w-[200px]'>
      <MdOutlineHideImage className='text-neu1-4 mx-auto' size={140}></MdOutlineHideImage>
      <h3 className='font-system text-[24px] text-neu1-5 text-center font-medium'>No Images Found</h3>
    </div>
  );
};

export default FullScreenImageSlideshowInvalid; 