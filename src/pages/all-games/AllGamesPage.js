import { useEffect, useRef, useState } from "react";
import GameCard from "../../components/cards/GameCard";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import VirtualizedGrid from "../../components/containers/VirtualizedGrid";
import { getGameList, getParentPlatformList } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import useSessionStorage from "../../hooks/useSessionStorage";
import GamesOrderDropdown from "./GamesOrderDropdown";
import GamesPlatformFilterDrowdown from "./GamesPlatformFilterDrowdown";
import { useParams } from "react-router-dom";

const AllGamesPage = () => {
  const requestsEnabledState = useSelector(state => state.request);
  const gamesFilters = useSelector(state => state.gamesFilters);
  const platformParam = useParams()["platform"];

  const [loadedContent, setLoadedContent] = useState([]);
  const currentPage = useRef(1);
  //const [contentScroll, setContentScroll] = useState(0);

  const gamesRequest = useApiRequest(() => getGameList(currentPage.current, gamesFilters.OrderBy));
  const platformListRequest = useApiRequest(getParentPlatformList);

  const firstRender = useRef(true);
  const observer = useRef();
  const listContainerElement = useRef();
  const visor = useRef();

  const updateIntersectionObserver = () => {
    if (gamesRequest.loading) return;
    !!observer.current && observer.current.disconnect();
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          currentPage.current += 1;
          currentPage.current > 1 && gamesRequest.makeRequest();
        }
      },
      { threshold: 1 }
    );

    !!visor.current && observer.current.observe(visor.current);
  };

  useEffect(() => {
    !!gamesRequest.data && setLoadedContent([...new Set([...loadedContent, ...gamesRequest.data.results])]);
  }, [gamesRequest.data]);

  useEffect(() => {
    updateIntersectionObserver();
  }, [gamesRequest.loading, requestsEnabledState]);

  useEffect(() => {
    setLoadedContent([]);
    gamesRequest.makeRequest();
    currentPage.current = 0;
  }, [gamesFilters]);

  useEffect(() => {}, [platformParam]);

  useEffect(() => {
    document.title = "All games";
  }, []);

  const getHeader = () => {
    const title = gamesFilters.Platform === "All" ? "All Games" : `Games for ${gamesFilters.Platform}`;
    return (
      <section className="mb-[25px]">
        <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black mb-[5px]">{title}</h1>
        <div className="flex flex-wrap gap-[15px]">
          <GamesOrderDropdown></GamesOrderDropdown>
          <GamesPlatformFilterDrowdown></GamesPlatformFilterDrowdown>
        </div>
      </section>
    );
  };

  const getFooter = () => {
    return gamesRequest.error ? (
      <div>
        <h1 className="text-[48px] font-System text-center font-extrabold dark:text-white">SOMETHING WENT WRONG</h1>
      </div>
    ) : gamesRequest.loading ? (
      <div className="flex justify-center w-full border-t-[1px] border-neu1-2 dark:border-neu1-9 py-[15px]">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          wrapperClass="blocks-wrapper"
          colors={["#0F74E7", "#00CDDB", "#FF74AD", "#0F74E7", "#FF74AD"]}
        />
      </div>
    ) : (
      <div ref={visor} className="block w-full h-[150px] mb-[10px]"></div>
    );
  };

  const gridElement = index => <GameCard key={index} game={loadedContent[index]}></GameCard>;

  return (
    <main
      ref={listContainerElement}
      className="px-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0"
    >
      <VirtualizedGrid
        name="AllGames"
        rowHeight={337}
        columnWidth={320}
        gapX={20}
        gapY={20}
        childElement={gridElement}
        total={loadedContent.length}
        buffer={1}
        scrollContainer={listContainerElement.current}
        //onScroll={scrollElement => setContentScroll(scrollElement?.scrollTop || 0)}
        initialScroll={0}
        header={getHeader()}
        footer={getFooter()}
      ></VirtualizedGrid>
    </main>
  );
};

export default AllGamesPage;
