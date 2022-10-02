import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGameDetail, getGameDetailScreenshots } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import PlatformsSection from "./PlatformsSection";
import GenresSection from "./GenresSection";
import MainInfoSection from "./MainInfoSection";
import DevelopersSection from "./DevelopersSection";
import MetacriticSection from "./MetacriticSection";
import GamePageSkeleton from "./GamePageSkeleton";
import saveScrollToSessionStorage from "../../utils/saveScrollToSessionStorage";
import { useMemo } from "react";
import { throttle } from "lodash";
import { useRef } from "react";

const GamePage = () => {
  const gameId = useParams()["gameId"];
  const localStorageGameDataKey = `game-data-${gameId}`;
  const localStorageGameScreenshotsKey = `game-screenshots-${gameId}`;
  const sessionStorageScrollKey = `game-page-scroll-${gameId}`;
  const theme = useSelector(state => state.theme);
  const gameRequest = useApiRequest(() => getGameDetail(gameId));
  const screenshotsRequest = useApiRequest(() => getGameDetailScreenshots(gameId));
  const [gameData, setGameData] = useState();
  const [gameScreenshots, setGameScreenshots] = useState();
  const mainContainerElement = useRef();
  const backgroundElement = useRef();

  const getGameData = () => {
    const cachedGameData = JSON.parse(localStorage.getItem(localStorageGameDataKey));
    const cachedGameScreenshots = JSON.parse(localStorage.getItem(localStorageGameScreenshotsKey));

    !!cachedGameData ? setGameData(cachedGameData) : gameRequest.makeRequest();
    !!cachedGameScreenshots ? setGameScreenshots(cachedGameScreenshots) : screenshotsRequest.makeRequest();
  };

  useEffect(() => {
    getGameData();
  }, []);

  useEffect(() => {
    getGameData();
  }, [gameId]);

  useEffect(() => {
    !!gameData && (document.title = gameData.name);
  }, [gameData]);

  useEffect(() => {
    if (!!gameRequest.data) {
      localStorage.setItem(localStorageGameDataKey, JSON.stringify(gameRequest.data));
      setGameData(gameRequest.data);
    }
  }, [gameRequest.data]);

  useEffect(() => {
    if (!!screenshotsRequest.data) {
      localStorage.setItem(localStorageGameScreenshotsKey, JSON.stringify(screenshotsRequest.data.results));
      setGameScreenshots(screenshotsRequest.data.results);
    }
  }, [screenshotsRequest.data]);

  useEffect(() => {
    !!mainContainerElement.current && (mainContainerElement.current.scrollTop = sessionStorage.getItem(sessionStorageScrollKey) || 0);
  }, [gameData]);

  const onPageScroll = useMemo(
    () => throttle(e => saveScrollToSessionStorage(e, sessionStorageScrollKey), 100, { leading: true, trailing: true }),
    []
  );

  const backgroundOnLoad = e => {
    const minimumResolution = 1800;
    const backgroundResolution = e.target.naturalWidth + e.target.naturalHeight;
    backgroundElement.current.classList.toggle("after:invisible", backgroundResolution > minimumResolution);
  };

  return gameRequest.loading || screenshotsRequest.loading || !gameData ? (
    <GamePageSkeleton></GamePageSkeleton>
  ) : (
    <main
      className="relative grow z-0 w-full bg-neu-1 dark:bg-neu1-10 pt-[30px] pb-[50px] px-[20px] overflow-auto animate-[fadeIn_0.5s_ease-out]"
      onScroll={onPageScroll}
      ref={mainContainerElement}
    >
      <div
        ref={backgroundElement}
        className={`z-[0] absolute top-[0px] left-[0px] right-[0px] min-h-[600px] bg-no-repeat bg-cover after:content=['']  after:absolute after:top-[0] after:left-[0] after:bottom-[0]
         after:right-[0] after:backdrop-blur-[10px] after:block after:invisible`}
        style={{
          backgroundImage: `url("${gameData.background_image}")`,
        }}
      ></div>
      <img className="hidden" src={gameData.background_image} onLoad={backgroundOnLoad}></img>
      <div
        className="z-[1] absolute top-[0px] left-[0px] right-[0px] min-h-[600px]"
        style={{
          background: theme == "dark" ? "linear-gradient(rgba(31,41,51,.65), #1F2933)" : "linear-gradient(rgba(229,231,235,.65), #e5e7eb)",
        }}
      ></div>

      {<MainInfoSection game={gameData || null} screenshots={gameScreenshots || null}></MainInfoSection>}

      {<PlatformsSection platforms={gameData.platforms || null}></PlatformsSection>}

      {<GenresSection genres={gameData.genres || null}></GenresSection>}

      {!!gameData.developers && gameData.developers.length > 0 && <DevelopersSection developers={gameData.developers}></DevelopersSection>}

      {!!gameData.metacritic && <MetacriticSection score={gameData.metacritic} metacriticURL={gameData.metacritic_url}></MetacriticSection>}
    </main>
  );
};

export default GamePage;
