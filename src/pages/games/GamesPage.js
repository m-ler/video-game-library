import { useEffect, useRef, useState } from "react";
import GameCard from "../../components/cards/GameCard";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import VirtualizedGrid from "../../components/containers/VirtualizedGrid";
import { getGameList } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import GamesOrderDropdown from "./GamesOrderDropdown";
import GamesPlatformFilterDrowdown from "./GamesPlatformFilterDrowdown";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { platformList, flattenPlatformList } from "../../data/platformList";
import { useLayoutEffect } from "react";
import orderByOptions from "../../data/orderByOptions";
import gamesPageCategories from "../../data/gamesPageCategories";

const GamesPage = () => {
  const locationPath = useLocation().pathname;
  const gamesPageCategory = gamesPageCategories.find(x => x.route.split("/:")[0] === locationPath) || null;
  const requestsEnabledState = useSelector(state => state.request);
  const routeParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const didMountRef = useRef(false);
  const selectedOrder = orderByOptions.find(x => x.value === searchParams.get("order")) || orderByOptions.find(x => x.value === "-added");
  const selectedPlatform = flattenPlatformList.find(x => x.slug === searchParams.get("platform")) || platformList.find(x => x.slug === "all");
  const pageTitle = !!gamesPageCategory ? gamesPageCategory.title : `Games for ${selectedPlatform.name}`;

  const [loadedContent, setLoadedContent] = useState([]);
  const currentPageRef = useRef(0);
  //const [contentScroll, setContentScroll] = useState(0);

  const gamesRequest = useApiRequest(() =>
    getGameList(currentPageRef.current, {
      order: selectedOrder.value,
      platform: selectedPlatform,
      category: gamesPageCategory?.category || "",
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
        if (entries[0].isIntersecting && requestsEnabledState && currentPageRef.current >= 1) {
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
    !!gamesRequest.data && setLoadedContent([...new Set([...loadedContent, ...(gamesRequest.data.results || [])])]);
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

export default GamesPage;
