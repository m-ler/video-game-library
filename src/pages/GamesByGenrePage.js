import { useMemo } from "react";
import { useParams } from "react-router-dom";
import GameList from "../components/containers/GameList/GameList";
import genreList from "../data/genreList";
import withRouteChangeRemounting from "../hoc/withRouteChangeRemounting";

const GamesByGenrePage = () => {
  const genreParam = useParams()["genre"];
  const genre = genreList.find(x => x.slug === genreParam);
  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return <GameListWithRouteChangeRemounting genre={genre}></GameListWithRouteChangeRemounting>;
};
export default GamesByGenrePage;
