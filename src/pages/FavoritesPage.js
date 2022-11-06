import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/cards/game-card/GameCard";
import VirtualizedGrid from "../components/containers/VirtualizedGrid";
import SpinnerA from "../components/elements/loading-animations/SpinnerA";
import NoMoreResults from "../components/state-messages/NoMoreResults";
import NoResultsFound from "../components/state-messages/NoResultsFound";
import RequestError from "../components/state-messages/RequestError";
import useApiRequest from "../hooks/useApiRequest";
import { getUserFavoriteGames } from "../utils/apiRequests";

const FavoritesPage = () => {
  const currentUser = useSelector(state => state.firebase.currentUser);
  const [gameList, setDeveloperList] = useState([]);

  const firstRender = useRef(true);
  const latestQueriedDoc = useRef();
  const listContainerElement = useRef();
  const intersectionElement = useRef();
  const intersectionObserver = useRef();

  const favoritesRequest = useApiRequest(() => getUserFavoriteGames(latestQueriedDoc.current, currentUser?.uid));

  const updateIntersectionObserver = () => {
    if (favoritesRequest.loading) return;
    !!intersectionObserver.current && intersectionObserver.current.disconnect();
    intersectionObserver.current = new IntersectionObserver(
      entries => {
        entries[0].isIntersecting && !!currentUser && favoritesRequest.makeRequest();
      },
      { threshold: 1 }
    );

    !!intersectionElement.current && intersectionObserver.current.observe(intersectionElement.current);
  };

  useEffect(() => {
    document.title = "Favorite games";
  }, []);

  useEffect(() => {
    favoritesRequest.makeRequest();
  }, [currentUser]);

  useEffect(() => {
    latestQueriedDoc.current = favoritesRequest.data?.lastDoc || null;
    setDeveloperList([...gameList, ...(favoritesRequest.data?.results || [])]);
    updateIntersectionObserver();
  }, [favoritesRequest.data]);

  const getFooter = () => {
    const noMoreResults = favoritesRequest.data?.empty && gameList.length > 0;
    const resultsNotFound = (favoritesRequest.data?.results === null && gameList.length === 0) || favoritesRequest.data?.results?.length === 0;

    return favoritesRequest.error ? (
      <RequestError></RequestError>
    ) : favoritesRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : noMoreResults ? (
      <NoMoreResults></NoMoreResults>
    ) : resultsNotFound ? (
      <NoResultsFound message="You haven't liked any games yet..."></NoResultsFound>
    ) : (
      <div ref={intersectionElement} className="min-h-[40px] my-[20px]"></div>
    );
  };

  const getGameCard = index => <GameCard key={index} game={gameList[index]}></GameCard>;

  return (
    <section
      ref={listContainerElement}
      className="px-[20px] pt-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0"
    >
      <div className="my-[25px]">
        <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] sm:text-[48px] font-black leading-[48px]">Favorite games</h1>
      </div>

      <VirtualizedGrid
        rowHeight={317}
        columnWidth={320}
        gapX={20}
        gapY={20}
        childElement={getGameCard}
        total={gameList.length}
        buffer={4}
      ></VirtualizedGrid>
      {getFooter()}
    </section>
  );
};

export default FavoritesPage;
