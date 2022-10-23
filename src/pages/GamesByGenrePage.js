import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import GameList from "../components/containers/GameList/GameList";
import SpinnerB from "../components/elements/loading-animations/SpinnerB";
import RequestError from "../components/state-messages/RequestError";
import withRouteChangeRemounting from "../hoc/withRouteChangeRemounting";
import useApiRequest from "../hooks/useApiRequest";
import { getGenreDetail } from "../utils/apiRequests";

const GamesByGenrePage = () => {
  const genreParam = useParams()["genre"];
  const [selectedGenre, setSelectedGenre] = useState();
  const genreRequest = useApiRequest(() => getGenreDetail(genreParam));

  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  useEffect(() => {
    genreRequest.makeRequest();
  }, []);

  useEffect(() => {
    setSelectedGenre(genreRequest.data || null);
  }, [genreRequest.data]);

  return genreRequest.error ? (
    <RequestError></RequestError>
  ) : genreRequest.loading ? (
    <SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
  ) : !!selectedGenre?.id ? (
    <GameListWithRouteChangeRemounting genre={selectedGenre}></GameListWithRouteChangeRemounting>
  ) : (
    <h1>Genre not found</h1>
  );
};
export default GamesByGenrePage;
