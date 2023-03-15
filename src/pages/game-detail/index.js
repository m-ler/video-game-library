import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGameDetail, getGameDetailScreenshots } from "../../api/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import PlatformsSection from "./PlatformsSection";
import GenresSection from "./GenresSection";
import MainInfoSection from "./MainInfoSection";
import DevelopersSection from "./DevelopersSection";
import MetacriticSection from "./MetacriticSection";
import GameDetailPageSkeleton from "./GameDetailPageSkeleton";
import { useRef } from "react";
import PublishersSection from "./PublishersSection";

const GameDetailPage = () => {
  const gameSlug = useParams()["gameSlug"];
  const theme = useSelector(state => state.theme);
  const gameRequest = useApiRequest(() => getGameDetail(gameSlug));
  const screenshotsRequest = useApiRequest(() => getGameDetailScreenshots(gameSlug));
  const [gameData, setGameData] = useState();
  const [gameScreenshots, setGameScreenshots] = useState();
  const mainContainerElement = useRef();
  const backgroundElement = useRef();

  const getGameData = () => {
    gameRequest.makeRequest();
    screenshotsRequest.makeRequest();
  };

  useEffect(() => {
    getGameData();
  }, []);

  useEffect(() => {
    getGameData();
  }, [gameSlug]);

  useEffect(() => {
    !!gameData?.id && (document.title = gameData.name);
  }, [gameData]);

  useEffect(() => {
    if (!!gameRequest.data?.id) {
      setGameData(gameRequest.data);
    }
  }, [gameRequest.data]);

  useEffect(() => {
    if (!!screenshotsRequest.data?.results) {
      setGameScreenshots(screenshotsRequest.data.results);
    }
  }, [screenshotsRequest.data]);

  const backgroundOnLoad = e => {
    const minimumResolution = 1800;
    const backgroundResolution = e.target.naturalWidth + e.target.naturalHeight;
    backgroundElement.current.classList.toggle("after:invisible", backgroundResolution > minimumResolution);
  };

  return gameRequest.loading || screenshotsRequest.loading ? (
    <GameDetailPageSkeleton></GameDetailPageSkeleton>
  ) : !!gameData?.id ? (
    <section
      className="relative grow z-0 w-full bg-neu-1 dark:bg-neu1-10 pt-[30px] pb-[50px] px-[20px] overflow-auto animate-[fadeIn_0.5s_ease-out] mt-[82px] sm:mt-[52px]"
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
          background: theme == "dark" ? "linear-gradient(rgba(31,41,51,.65), #1F2933)" : "linear-gradient(rgba(229,231,235,.85), #e5e7eb)",
        }}
      ></div>

      {<MainInfoSection game={gameData || null} screenshots={gameScreenshots || null}></MainInfoSection>}
      {<PlatformsSection platforms={gameData.platforms || null}></PlatformsSection>}
      {<GenresSection genres={gameData.genres || null}></GenresSection>}
      {<DevelopersSection developers={gameData.developers}></DevelopersSection>}
      {<PublishersSection publishers={gameData.publishers}></PublishersSection>}

      {!!gameData.metacritic && <MetacriticSection score={gameData.metacritic} metacriticURL={gameData.metacritic_url}></MetacriticSection>}
    </section>
  ) : (
    <h1>GAME NOT FOUND</h1>
  );
};

export default GameDetailPage;
