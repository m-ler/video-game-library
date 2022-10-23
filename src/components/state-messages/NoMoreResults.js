import MarioBlocks from "../../assets/svgr/illustration/MarioBlocks";

const NoMoreResults = () => {
  return (
    <div className="w-full my-[20px] mb-[50px] flex flex-col border-t border-t-neu1-3 dark:border-t-neu1-8 pt-[20px]">
      <MarioBlocks className="max-w-[100px] mx-auto fill-neu1-5"></MarioBlocks> 
      <span className="text-center block text-neu1-5 font-System font-semibold text-[16px]">You've reached the end</span>
    </div>
  );
};
export default NoMoreResults;