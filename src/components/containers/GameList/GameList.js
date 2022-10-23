import { useEffect, useRef, useState } from "react";
import GameCard from "../../cards/game-card/GameCard";
import { useSelector } from "react-redux";
import VirtualizedGrid from "../VirtualizedGrid";
import { getGameList } from "../../../utils/apiRequests";
import useApiRequest from "../../../hooks/useApiRequest";
import GamesOrderDropdown from "./GamesOrderDropdown";
import GamesPlatformFilterDrowdown from "./GamesPlatformFilterDrowdown";
import { useSearchParams } from "react-router-dom";
import { platformList, flattenPlatformList } from "../../../data/platformList";
import { useLayoutEffect } from "react";
import orderByOptions from "../../../data/orderByOptions";
import SpinnerA from "../../elements/loading-animations/SpinnerA";
import NoMoreResults from "../../state-messages/NoMoreResults";
import NoResultsFound from "../../state-messages/NoResultsFound";
import RequestError from "../../state-messages/RequestError";

const getPageTitle = (platform, genre, developer, publisher) => {
  let title = "";
  title += !!genre ? `${genre.name} games` : "";
  title += !!developer ? `Developed by ${developer.name}` : "";
  title += !!publisher ? `Published by ${publisher.name}` : "";
  title += !!platform && platform !== "All" ? ` for ${platform}` : "";

  if (platform && !genre && !developer && !publisher) title = `Games for ${platform}`;
  if (platform === "All" && !genre && !developer && !publisher) title = "All games";
  return title;
};

const GameList = props => {
  const requestsEnabledState = useSelector(state => state.request);
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
        if (entries[0].isIntersecting && requestsEnabledState && currentPageRef.current >= 1 && gamesRequest.data.next !== null) {
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
  }, [gamesRequest.loading, requestsEnabledState]);

  useEffect(() => {
    !!gamesRequest.data && setGameList([...new Set([...gameList, ...(gamesRequest.data.results || [])])]);
  }, [gamesRequest.data]);

  const getHeader = () => {
    return (
      <section className="mb-[25px]">
        <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black my-[30px] leading-[70px]">{pageTitle}</h1>

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
      <NoResultsFound></NoResultsFound>
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
      className="px-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0"
    >
      <VirtualizedGrid
        name="GameList"
        rowHeight={317}
        columnWidth={320}
        gapX={20}
        gapY={20}
        childElement={getGameCard}
        total={gameList.length}
        buffer={1}
        scrollContainer={listContainerElement.current}
        //onScroll={scrollElement => setContentScroll(scrollElement?.scrollTop || 0)}
        initialScroll={0}
        header={getHeader()}
        footer={getFooter()}
      ></VirtualizedGrid>
    </section>
  );
};

export default GameList;
