import MarioBlock from "../assets/svgr/illustration/MarioBlock";
import NotFound404Pacman from "../assets/svgr/illustration/NotFound404Pacman";

const NotFound404Page = () => {
  return (
    <main className="flex flex-col items-center m-auto p-[20px] overflow-auto max-h-full">
      <NotFound404Pacman className="w-[min(500px,100%)] text-neu1-10 dark:text-neu1-1"></NotFound404Pacman>
      <h1 className="font-black  text-neu1-8 dark:text-neu1-3 text-[42px] text-center font-System leading-[45px] tracking-[10px] mt-[20px]">Page not found</h1>
    </main>
  );
};

export default NotFound404Page;