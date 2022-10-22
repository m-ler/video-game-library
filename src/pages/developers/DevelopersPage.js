import { useLayoutEffect } from "react";
import { useState, useRef, useEffect } from "react";
import VirtualizedGrid from "../../components/containers/VirtualizedGrid";
import SpinnerA from "../../components/elements/loading-animations/SpinnerA";
import useApiRequest from "../../hooks/useApiRequest";
import { getDeveloperList } from "../../utils/apiRequests";
import DeveloperCard from "./DeveloperCard";

const getHeader = () => {
  return (
    <div className="mb-[25px]">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black">Developers</h1>
    </div>
  );
};

const DevelopersPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [developerList, setDeveloperList] = useState([]);
  const developersRequest = useApiRequest(() => getDeveloperList(currentPage));
  const listContainerElement = useRef();
  const intersectionElement = useRef();
  const intersectionObserver = useRef();

  const updateIntersectionObserver = () => {
    if (developersRequest.loading) return;
    !!intersectionObserver.current && intersectionObserver.current.disconnect();
    intersectionObserver.current = new IntersectionObserver(
      entries => {
        entries[0].isIntersecting && setCurrentPage(currentPage + 1);
      },
      { threshold: 1 }
    );

    !!intersectionElement.current && intersectionObserver.current.observe(intersectionElement.current);
  };

  useEffect(() => {
    document.title = "Developers";
  }, []);

  useLayoutEffect(() => {
    currentPage > 0 && developersRequest.makeRequest();
  }, [currentPage]);

  useEffect(() => {
    setDeveloperList([...developerList, ...(developersRequest.data?.results || [])]);
    updateIntersectionObserver();
  }, [developersRequest.data]);

  const getFooter = () => {
    return developersRequest.error ? (
      <h1>SOMETHING WENT WRONG</h1>
    ) : developersRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : (
      <div ref={intersectionElement} className="min-h-[40px] my-[20px]"></div>
    );
  };

  const getDeveloperCard = index => <DeveloperCard key={index} developer={developerList[index]}></DeveloperCard>;

  return (
    <section
      ref={listContainerElement}
      className="px-[20px] pt-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0"
    >
      <VirtualizedGrid
        name="DevelopersList"
        columnWidth={400}
        rowHeight={120}
        gapX={20}
        gapY={20}
        childElement={getDeveloperCard}
        total={developerList.length}
        buffer={1}
        scrollContainer={listContainerElement.current}
        initialScroll={0}
        header={getHeader()}
        footer={getFooter()}
      ></VirtualizedGrid>
    </section>
  );
};

export default DevelopersPage;
