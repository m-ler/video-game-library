import { Routes, Route, Navigate } from "react-router-dom";
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
import NotFound404Page from "./pages/NotFound404Page";
import LogInPage from "./pages/log-in/LogInPage";
import WithNavDrawer from "./layouts/WithNavDrawer";
import { ToastContainer, toast } from "react-toastify";
import RecoverPasswordPage from "./pages/recover-password/RecoverPasswordPage";
import ResetPasswordPage from "./pages/reset-password/ResetPasswordPage";
import WithoutNavDrawer from "./layouts/WithoutNavDrawer";
import useFirebaseManager from "./hooks/useFirebaseManager";

const App = () => {
  useFirebaseManager();

  const GamesPageWRCR = useMemo(() => withRouteChangeRemounting(GamesPage), []);
  const SearchResultsPageWRCR = useMemo(() => withRouteChangeRemounting(SearchResultsPage), []);

  return (
    <div id="app" className="z-0">
      <div className="min-h-screen bg-neu1-2 dark:bg-neu1-10 min-w-[320px] flex flex-col w-full z-0">
        <Routes>
          <Route element={<WithoutNavDrawer></WithoutNavDrawer>}>
            <Route path="*" element={<NotFound404Page></NotFound404Page>}></Route>
            <Route path="/login" element={<LogInPage></LogInPage>}></Route>
            <Route path="/recover-password" element={<RecoverPasswordPage></RecoverPasswordPage>}></Route>
            <Route path="/reset-password" element={<ResetPasswordPage></ResetPasswordPage>}></Route>
          </Route>

          <Route element={<WithNavDrawer></WithNavDrawer>}>
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
          </Route>
        </Routes>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
