import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/header/Header';
import AllGamesPage from './pages/all-games/AllGamesPage';
import GamePage from './pages/game/GamePage';



const App = () => {
  const themeState = useSelector(state => state.theme);
  useEffect(() => {
  });


  return (
    <div className={themeState}>
      <div className='h-screen bg-bg-gradient dark:bg-bg-gradient-dark min-w-[320px] flex flex-col w-full'>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<AllGamesPage></AllGamesPage>}></Route>
            <Route path="game/:gameId" element={<GamePage></GamePage>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
