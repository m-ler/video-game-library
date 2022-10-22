import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import NavigationDrawer from "./components/navigation-drawer/NavigationDrawer";
import withRouteChangeRemounting from "./hoc/withRouteChangeRemounting";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/game-detail/GameDetailPage";
import GenresPage from "./pages/genres/GenresPage";
import GamesByGenrePage from "./pages/GamesByGenrePage";
import BestOfTheYearPage from "./pages/BestOfTheYearPage";
import BestOfAllTimePage from "./pages/BestOfAllTimePage";
import DevelopersPage from "./pages/developers/DevelopersPage";
import GamesByDeveloperPage from "./pages/GamesByDeveloperPage";
import PublishersPage from "./pages/publishers/PublishersPage";
import GamesByPublisherPage from "./pages/GamesByPublisherPage";
import PlatformsPage from "./pages/platforms/PlatformsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { useMemo } from "react";

const App = () => {
  const themeState = useSelector(state => state.theme);
  const GamesPageWRCR = useMemo(() => withRouteChangeRemounting(GamesPage), []);
  const SearchResultsPageWRCR = useMemo(() => withRouteChangeRemounting(SearchResultsPage), []);

  return (
    <div id="app" className={`${themeState} z-0`}>
      <div className="h-screen bg-bg-gradient dark:bg-bg-gradient-dark min-w-[320px] flex flex-col w-full z-0">
        <Header></Header>
        <section className="grow w-full flex overflow-hidden relative z-0">
          <NavigationDrawer></NavigationDrawer>
          <Routes>
            <Route path="/" element={<Navigate replace to="/games"></Navigate>}></Route>
            <Route path="/games" element={<GamesPageWRCR></GamesPageWRCR>}></Route>
            <Route path="/games/best-of-the-year" element={<BestOfTheYearPage></BestOfTheYearPage>}></Route>
            <Route path="/games/best-of-all-time" element={<BestOfAllTimePage></BestOfAllTimePage>}></Route>
            <Route path="game/:gameSlug" element={<GameDetailPage></GameDetailPage>}></Route>
            <Route path="/platforms" element={<PlatformsPage></PlatformsPage>}></Route>
            <Route path="/genres" element={<GenresPage></GenresPage>}></Route>
            <Route path="/genres/:genre" element={<GamesByGenrePage></GamesByGenrePage>}></Route>
            <Route path="/developers" element={<DevelopersPage></DevelopersPage>}></Route>
            <Route path="/developers/:developer" element={<GamesByDeveloperPage></GamesByDeveloperPage>}></Route>
            <Route path="/publishers" element={<PublishersPage></PublishersPage>}></Route>
            <Route path="/publishers/:publisher" element={<GamesByPublisherPage></GamesByPublisherPage>}></Route>
            <Route path="/search/:query" element={<SearchResultsPageWRCR></SearchResultsPageWRCR>}></Route>
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default App;
