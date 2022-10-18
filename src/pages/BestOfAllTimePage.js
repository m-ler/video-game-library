import { useMemo } from "react";
import GameList from "../components/containers/GameList/GameList";
import withRouteChangeRemounting from "../hoc/withRouteChangeRemounting";

const BestOfAllTimePage = () => {
  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return <GameListWithRouteChangeRemounting title="Best of All Time" category="/lists/popular"></GameListWithRouteChangeRemounting>;
};

export default BestOfAllTimePage;
