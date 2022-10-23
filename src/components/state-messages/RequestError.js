import UnpluggedArcade from "../../assets/svgr/illustration/UnpluggedArcade";

const RequestError = () => {
  return (
    <div className="flex flex-col mt-[20px]">
      <UnpluggedArcade className="text-accent1 dark:text-accent3 max-w-[180px] mx-auto mb-[10px]"></UnpluggedArcade>
      <span className="text-center text-[56px] font-black text-neu1-8 dark:text-neu1-3">Whoops!</span>
      <span className="text-center text-[18px] font-medium text-neu1-5">Something went wrong. Couldn't connect to server.</span>
    </div>
  );
};

export default RequestError;