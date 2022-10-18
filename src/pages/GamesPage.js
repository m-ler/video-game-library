import { useMemo } from "react";
import GameList from "../components/containers/GameList/GameList";
import withRouteChangeRemounting from "../hoc/withRouteChangeRemounting";

const GamesPage = () => {
  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return <GameListWithRouteChangeRemounting></GameListWithRouteChangeRemounting>;
};

export default GamesPage;
