import { useLayoutEffect } from "react";
import { useState, useEffect, useRef } from "react";
import { MdSearch } from "react-icons/md";
import { useParams } from "react-router-dom";
import GameCard from "../../components/game-card";
import VirtualizedGrid from "../../components/virtualized-grid";
import SpinnerA from "../../components/loading-animations/SpinnerA";
import NoMoreResults from "../../components/state-messages/NoMoreResults";
import NoResultsFound from "../../components/state-messages/NoResultsFound";
import RequestError from "../../components/state-messages/RequestError";
import useApiRequest from "../../hooks/useApiRequest";
import { getGameSearchList } from "../../api/apiRequests";

const SearchResultsPage = () => {
  const queryParam = useParams()["query"];
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsList, setResultsList] = useState([]);
  const gameResultsRequest = useApiRequest(() => getGameSearchList(queryParam, currentPage, 100));
  const listContainerElement = useRef();
  const intersectionElement = useRef();
  const intersectionObserver = useRef();

  const updateIntersectionObserver = () => {
    if (gameResultsRequest.loading) return;
    !!intersectionObserver.current && intersectionObserver.current.disconnect();
    intersectionObserver.current = new IntersectionObserver(entries => entries[0].isIntersecting && setCurrentPage(prev => prev + 1), {
      threshold: 1,
    });

    !!intersectionElement.current && intersectionObserver.current.observe(intersectionElement.current);
  };

  useEffect(() => {
    document.title = `${queryParam} - Search`;
  }, []);

  useLayoutEffect(() => {
    currentPage > 0 && gameResultsRequest.makeRequest();
  }, [currentPage]);

  useLayoutEffect(() => {
    setResultsList(prev => [...prev, ...(gameResultsRequest.data?.results || [])]);
    updateIntersectionObserver();
  }, [gameResultsRequest.data]);

  const getHeader = () => {
    const resultCount = gameResultsRequest.data?.count || null;
    return (
      <section className="mb-[25px] mt-[10px]">
        <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[48px] font-black leading-[50px] inline break-all">
          <MdSearch className="inline min-w-[40px] text-neu1-8 dark:text-neu1-3 mt-[-5px]" size={40}></MdSearch>'{queryParam}'
        </h1>
        {resultCount && (
          <span className="px-[16px] py-[6px] text-[13px] font-OpenSans font-semibold bg-neu1-1 dark:bg-neu1-9 text-neu1-6 dark:text-neu1-3 rounded-xl block w-fit mt-[20px]">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
        )}
      </section>
    );
  };

  const getFooter = () => {
    const hasMoreResults = gameResultsRequest.data?.next !== null;
    const resultsNotFound =
      gameResultsRequest.data?.next === null && gameResultsRequest.data?.previous === null && resultsList.length === 0;

    return gameResultsRequest.error ? (
      <RequestError></RequestError>
    ) : gameResultsRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : resultsNotFound ? (
      <NoResultsFound message="We couldn't find any game matching your search."></NoResultsFound>
    ) : !hasMoreResults ? (
      <NoMoreResults></NoMoreResults>
    ) : (
      <div ref={intersectionElement} className="min-h-[40px] my-[20px]"></div>
    );
  };

  const getGameCard = index => <GameCard key={index} game={resultsList[index]}></GameCard>;

  return (
    <section
      ref={listContainerElement}
      className="px-[20px] pt-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0 mt-[82px] sm:mt-[52px]"
    >
      {getHeader()}
      <VirtualizedGrid
        rowHeight={317}
        columnWidth={320}
        gapX={20}
        gapY={20}
        childElement={getGameCard}
        total={resultsList.length}
        buffer={4}
      ></VirtualizedGrid>
      {getFooter()}
    </section>
  );
};

export default SearchResultsPage;
