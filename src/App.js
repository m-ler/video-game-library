import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import NavigationDrawer from "./components/navigation-drawer/NavigationDrawer";
import withRouteChangeRemounting from "./hoc/withRouteChangeRemounting";
import GamesPage from "./pages/games/GamesPage";
import GameDetailPage from "./pages/game-detail/GameDetailPage";
import { useEffect, useMemo } from "react";

const App = () => {
  const themeState = useSelector(state => state.theme);
  const GamesPageWithRouteChangeRemounting = useMemo(() => withRouteChangeRemounting(GamesPage), []);

  useEffect(() => {});

  return (
    <div id="app" className={themeState}>
      <div className="h-screen bg-bg-gradient dark:bg-bg-gradient-dark min-w-[320px] flex flex-col w-full">
        <Header></Header>
        <section className="grow w-full flex overflow-hidden">
          <NavigationDrawer></NavigationDrawer>
          <Routes>
            <Route path="/" element={<Navigate replace to="/games"></Navigate>}></Route>
            <Route path="/games" element={<GamesPageWithRouteChangeRemounting></GamesPageWithRouteChangeRemounting>}></Route>
            <Route path="/games/best-of-the-year" element={<GamesPageWithRouteChangeRemounting></GamesPageWithRouteChangeRemounting>}></Route>
            <Route path="/games/best-of-all-time" element={<GamesPageWithRouteChangeRemounting></GamesPageWithRouteChangeRemounting>}></Route>
            <Route path="game/:gameId" element={<GameDetailPage></GameDetailPage>}></Route>
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default App;
