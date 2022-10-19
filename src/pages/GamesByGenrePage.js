import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GameList from "../components/containers/GameList/GameList";
import SpinnerB from "../components/elements/loading-animations/SpinnerB";
import { setGenres } from "../features/data/genreSlice";
import withRouteChangeRemounting from "../hoc/withRouteChangeRemounting";
import useApiRequest from "../hooks/useApiRequest";
import { getGenreList } from "../utils/apiRequests";

const GamesByGenrePage = () => {
  const dispatch = useDispatch();
  const genreList = useSelector(state => state.genres);
  const genreRequest = useApiRequest(getGenreList);

  const genreParam = useParams()["genre"];
  const genre = genreList.find(x => x.slug === genreParam);
  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  useEffect(() => {
    !genreList.length > 0 && genreRequest.makeRequest();
  }, []);

  useEffect(() => {
    !genreList.length > 0 && dispatch(setGenres(genreRequest.data?.results || []));
  }, [genreRequest.data]);

  return genreRequest.error ? (
    <h1>SOMETHING WENT WRONG</h1>
  ) : genreRequest.loading ? (
    <SpinnerB className="w-full flex justify-center m-[20px] px-[20px]"></SpinnerB>
  ) : !!genre?.id ? (
    <GameListWithRouteChangeRemounting genre={genre}></GameListWithRouteChangeRemounting>
  ) : <h1>Genre not found</h1>;
};
export default GamesByGenrePage;
