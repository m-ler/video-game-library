import { Routes, Route, Navigate } from 'react-router-dom';
import withRouteChangeRemounting from './hoc/withRouteChangeRemounting';
import GamesPage from './pages/games';
import GameDetailPage from './pages/game-detail';
import GenresPage from './pages/genres';
import GamesByGenrePage from './pages/games-by-genre';
import BestOfTheYearPage from './pages/best-of-the-year';
import BestOfAllTimePage from './pages/best-of-all-time';
import DevelopersPage from './pages/developers';
import GamesByDeveloperPage from './pages/games-by-developer';
import PublishersPage from './pages/publishers';
import GamesByPublisherPage from './pages/games-by-publisher';
import PlatformsPage from './pages/platforms';
import SearchResultsPage from './pages/search-results';
import { useMemo } from 'react';
import NotFound404Page from './pages/not-found-404';
import LogInPage from './pages/log-in';
import WithNavigation from './layouts/WithNavigation';
import { ToastContainer } from 'react-toastify';
import RecoverPasswordPage from './pages/recover-password';
import ResetPasswordPage from './pages/reset-password';
import WithoutNavigation from './layouts/WithoutNavigation';
import FavoritesPage from './pages/favorites';
import ScrollBodyToTop from './components/scroll-body-to-top';
import FirebaseManager from './components/firebase/FirebaseManager';
import DeleteAccountPage from './pages/delete-account';
import PrivateRoute from './components/react-router/PrivateRoute';

const App = () => {
	const GamesPageWRCR = useMemo(() => withRouteChangeRemounting(GamesPage), []);
	const SearchResultsPageWRCR = useMemo(() => withRouteChangeRemounting(SearchResultsPage), []);

	return (
		<div id="app" className="z-0">
			<ScrollBodyToTop></ScrollBodyToTop>
			<FirebaseManager></FirebaseManager>
			<div className="min-h-screen bg-neu1-2 dark:bg-neu1-10 min-w-[320px] flex flex-col w-full z-0">
				<Routes>
					<Route element={<WithoutNavigation></WithoutNavigation>}>
						<Route path="*" element={<NotFound404Page></NotFound404Page>}></Route>
						<Route
							path="/login"
							element={
								<PrivateRoute onlyAnonymous={true}>
									<LogInPage></LogInPage>
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/recover-password"
							element={
								<PrivateRoute onlyAnonymous={true}>
									<RecoverPasswordPage></RecoverPasswordPage>
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/reset-password"
							element={
								<PrivateRoute onlyAnonymous={true}>
									<ResetPasswordPage></ResetPasswordPage>
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/delete-account"
							element={
								<PrivateRoute onlyUsers={true}>
									<DeleteAccountPage></DeleteAccountPage>
								</PrivateRoute>
							}
						></Route>
					</Route>

					<Route element={<WithNavigation></WithNavigation>}>
						<Route path="/" element={<Navigate replace to="/games"></Navigate>}></Route>
						<Route path="/games" element={<GamesPageWRCR></GamesPageWRCR>}></Route>
						<Route path="/games/best-of-the-year" element={<BestOfTheYearPage></BestOfTheYearPage>}></Route>
						<Route path="/games/best-of-all-time" element={<BestOfAllTimePage></BestOfAllTimePage>}></Route>
						<Route
							path="/favorites"
							element={
								<PrivateRoute onlyUsers={true}>
									<FavoritesPage></FavoritesPage>
								</PrivateRoute>
							}
						></Route>
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
