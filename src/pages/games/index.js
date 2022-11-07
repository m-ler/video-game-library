import { useMemo } from "react";
import GameList from "../../components/game-list";
import withRouteChangeRemounting from "../../hoc/withRouteChangeRemounting";

const GamesPage = () => {
  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return <GameListWithRouteChangeRemounting></GameListWithRouteChangeRemounting>;
};

export default GamesPage;
