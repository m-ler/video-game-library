import { useMemo } from "react";
import GameList from "../../components/game-list";
import withRouteChangeRemounting from "../../hoc/withRouteChangeRemounting";

const BestOfTheYearPage = () => {
  const GameListWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GameList), []);

  return <GameListWithRouteChangeRemounting title="Best of the Year" category="/lists/greatest"></GameListWithRouteChangeRemounting>;
};

export default BestOfTheYearPage;
