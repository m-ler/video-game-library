import { useEffect } from "react";
import { Link } from "react-router-dom";
import genreList from "../../data/genreList";
import GenreCard from "./GenreCard";

const GenresPage = () => {
  useEffect(() => {}, []);
  //`repeat(auto-fit, minmax(min(${props.columnWidth}px, 100%), 1fr))`;
  return (
    <div className="px-[20px] pt-[20px] pb-[50px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black">Genres</h1>
      <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,_minmax(min(200px,_100%),_1fr))]">
        {genreList.map((genreObj, index) => (
          <GenreCard key={index} genre={genreObj}></GenreCard>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
