import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import AllGamesPage from "./pages/all-games/AllGamesPage";
import GamePage from "./pages/game/GamePage";
import NavigationDrawer from "./components/navigation-drawer/NavigationDrawer";

const App = () => {
  const themeState = useSelector(state => state.theme);
  useEffect(() => {});

  return (
    <div id="app" className={themeState}>
      <div className="h-screen bg-bg-gradient dark:bg-bg-gradient-dark min-w-[320px] flex flex-col w-full">
        <BrowserRouter>
          <Header></Header>
          <section className="grow w-full flex overflow-hidden">
            <NavigationDrawer></NavigationDrawer>
            <Routes>
              <Route path="/" element={<AllGamesPage></AllGamesPage>}></Route>
              <Route path="game/:gameId" element={<GamePage></GamePage>}></Route>
            </Routes>
          </section>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
