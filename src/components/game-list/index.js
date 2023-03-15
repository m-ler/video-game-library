import { useEffect, useRef, useState } from "react";
import GameCard from "../game-card";
import VirtualizedGrid from "../virtualized-grid";
import { getGameList } from "../../api/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import GamesOrderDropdown from "./GamesOrderDropdown";
import GamesPlatformFilterDrowdown from "./GamesPlatformFilterDrowdown";
import { useSearchParams } from "react-router-dom";
import { platformList, flattenPlatformList } from "../../data/platformList";
import { useLayoutEffect } from "react";
import orderByOptions from "../../data/orderByOptions";
import SpinnerA from "../loading-animations/SpinnerA";
import NoMoreResults from "../state-messages/NoMoreResults";
import NoResultsFound from "../state-messages/NoResultsFound";
import RequestError from "../state-messages/RequestError";

const getPageTitle = (platform, genre, developer, publisher) => {
  let title = "";
  title += !!genre?.id ? `${genre.name} games` : "";
  title += !!developer?.id ? `Developed by ${developer.name}` : "";
  title += !!publisher?.id ? `Published by ${publisher.name}` : "";
  title += !!platform && platform !== "All" ? ` for ${platform}` : "";

  if (platform && !genre?.id && !developer?.id && !publisher?.id) title = `Games for ${platform}`;
  if (platform === "All" && !genre?.id && !developer?.id && !publisher?.id) title = "All games";
  return title;
};

const GameList = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const didMountRef = useRef(false);

  const selectedOrder =
    props.order || orderByOptions.find(x => x.value === searchParams.get("order")) || orderByOptions.find(x => x.value === "-added");

  const selectedPlatform =
    props.platform || flattenPlatformList.find(x => x.slug === searchParams.get("platform")) || platformList.find(x => x.slug === "all");

  const pageTitle = props.title || getPageTitle(selectedPlatform.name, props.genre, props.developer, props.publisher);

  const [gameList, setGameList] = useState([]);
  const currentPageRef = useRef(0);

  const gamesRequest = useApiRequest(() =>
    getGameList(currentPageRef.current, {
      order: selectedOrder.value,
      platform: selectedPlatform,
      category: props.category || "",
      genre: props.genre?.id || "",
      developer: props.developer?.slug || "",
      publisher: props.publisher?.slug || "",
    })
  );

  const observer = useRef();
  const listContainerElement = useRef();
  const visor = useRef();

  const updateIntersectionObserver = () => {
    if (gamesRequest.loading && !didMountRef.current) return;
    !!observer.current && observer.current.disconnect();
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && currentPageRef.current >= 1 && gamesRequest.data?.next !== null) {
          currentPageRef.current += 1;
          gamesRequest.makeRequest();
        }
      },
      { threshold: 1 }
    );

    !!visor.current && observer.current.observe(visor.current);
  };

  useLayoutEffect(() => {
    didMountRef.current = true;
    document.title = pageTitle;
    currentPageRef.current = 1;
    gamesRequest.makeRequest();
  }, []);

  useEffect(() => {
    updateIntersectionObserver();
  }, [gamesRequest.loading]);

  useEffect(() => {
    !!gamesRequest.data && setGameList([...new Set([...gameList, ...(gamesRequest.data.results || [])])]);
  }, [gamesRequest.data]);

  const getHeader = () => {
    return (
      <section className="mb-[25px]">
        <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] sm:text-[48px] font-black my-[30px] sm:my-[15px] leading-[70px] sm:leading-[55px]">
          {pageTitle}
        </h1>

        <div className="flex flex-wrap gap-[15px]">
          
          <GamesOrderDropdown selectedOrder={selectedOrder}></GamesOrderDropdown>
          <GamesPlatformFilterDrowdown selectedPlatform={selectedPlatform}></GamesPlatformFilterDrowdown>
        </div>
      </section>
    );
  };

  const getFooter = () => {
    const hasMoreResults = gamesRequest.data?.next !== null;
    const resultsNotFound = gamesRequest.data?.next === null && gamesRequest.data?.previous === null && gameList.length === 0;

    return gamesRequest.error ? (
      <RequestError></RequestError>
    ) : gamesRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : resultsNotFound ? (
      <NoResultsFound message="We couldn't find any game with this filter combination. "></NoResultsFound>
    ) : !hasMoreResults ? (
      <NoMoreResults></NoMoreResults>
    ) : (
      <div ref={visor} className="block w-full h-[150px] mb-[10px]"></div>
    );
  };

  const getGameCard = index => <GameCard key={index} game={gameList[index]}></GameCard>;

  return (
    <section
      ref={listContainerElement}
      className="px-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] mt-[82px] sm:mt-[52px] overflow-auto max-h-full z-0"
    >
      {getHeader()}
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

export default GameList;
