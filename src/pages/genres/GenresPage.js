import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerA from "../../components/elements/loading-animations/SpinnerA";
import { setGenres } from "../../features/data/genreSlice";
import useApiRequest from "../../hooks/useApiRequest";
import { getGenreList } from "../../utils/apiRequests";
import GenreList from "./GenreList";

const GenresPage = () => {
  const genreList = useSelector(state => state.genres);
  const genreRequest = useApiRequest(getGenreList);
  const dispatch = useDispatch();

  useEffect(() => {
    genreRequest.makeRequest();
    document.title = "Genres";
  }, []);

  useEffect(() => {
    dispatch(setGenres(genreRequest.data?.results || []));
  }, [genreRequest.data]);

  const getContent = () => {
    return genreRequest.error ? (
      <h1 className="text-[48px] font-System text-center font-bold dark:text-white">SOMETHING WENT WRONG</h1>
    ) : genreRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : (
      <GenreList genreList={genreList}></GenreList>
    );
  };

  return (
    <div className="px-[20px] pt-[20px] pb-[50px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black">Genres</h1>
      {getContent()}
    </div>
  );
};

export default GenresPage;
