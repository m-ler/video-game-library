import { useState, useEffect } from "react";
import SpinnerA from "../../components/loading-animations/SpinnerA";
import RequestError from "../../components/state-messages/RequestError";
import useApiRequest from "../../hooks/useApiRequest";
import { getGenreList } from "../../api/apiRequests";
import GenreList from "./GenreList";

const GenresPage = () => {
  const [genreList, setGenreList] = useState([]);
  const genreRequest = useApiRequest(getGenreList);

  useEffect(() => {
    genreRequest.makeRequest();
    document.title = "Genres";
  }, []);

  useEffect(() => {
    setGenreList(genreRequest.data?.results || []);
  }, [genreRequest.data]);

  const getContent = () => {
    return genreRequest.error ? (
      <RequestError></RequestError>
    ) : genreRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : (
      <GenreList genreList={genreList}></GenreList>
    );
  };

  return (
    <div className="px-[20px] pt-[20px] pb-[50px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0 mt-[82px] sm:mt-[52px]">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] sm:text-[48px] font-black">Genres</h1>
      {getContent()}
    </div>
  );
};

export default GenresPage;
