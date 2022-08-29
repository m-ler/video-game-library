import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/header/Header';
import AllGames from './pages/all-games/AllGames';


const App = () => {
  const themeState = useSelector(state => state.theme);
  useEffect(() => {
  });


  return (
    <div className={themeState}>
      <div className='h-screen bg-bg-gradient dark:bg-bg-gradient-dark min-w-[320px] flex flex-col w-full'>
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllGames></AllGames>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
