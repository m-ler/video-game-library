import { useLayoutEffect } from "react";
import { useState, useRef, useEffect } from "react";
import VirtualizedGrid from "../../components/virtualized-grid";
import SpinnerA from "../../components/loading-animations/SpinnerA";
import NoMoreResults from "../../components/state-messages/NoMoreResults";
import RequestError from "../../components/state-messages/RequestError";
import useApiRequest from "../../hooks/useApiRequest";
import { getPublisherList } from "../../utils/apiRequests";
import PublisherCard from "./PublisherCard";

const getHeader = () => {
  return (
    <div className="mb-[25px]">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] sm:text-[48px] font-black">Publishers</h1>
    </div>
  );
};

const PublishersPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [publisherList, setPublisherList] = useState([]);
  const publishersRequest = useApiRequest(() => getPublisherList(currentPage));
  const listContainerElement = useRef();
  const intersectionElement = useRef();
  const intersectionObserver = useRef();

  const updateIntersectionObserver = () => {
    if (publishersRequest.loading) return;
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
    document.title = "Publishers";
  }, []);

  useLayoutEffect(() => {
    currentPage > 0 && publishersRequest.makeRequest();
  }, [currentPage]);

  useEffect(() => {
    setPublisherList([...publisherList, ...(publishersRequest.data?.results || [])]);
    updateIntersectionObserver();
  }, [publishersRequest.data]);

  const getFooter = () => {
    const hasMoreResults = publishersRequest.data?.next !== null;

    return publishersRequest.error ? (
      <RequestError></RequestError>
    ) : publishersRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : !hasMoreResults ? (
      <NoMoreResults></NoMoreResults>
    ) : (
      <div ref={intersectionElement} className="min-h-[40px] my-[20px]"></div>
    );
  };

  const getPublisherCard = index => <PublisherCard key={index} publisher={publisherList[index]}></PublisherCard>;

  return (
    <section
      ref={listContainerElement}
      className="px-[20px] pt-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0 mt-[82px] sm:mt-[52px]"
    >
      {getHeader()}
      <VirtualizedGrid
        columnWidth={400}
        rowHeight={120}
        gapX={20}
        gapY={20}
        childElement={getPublisherCard}
        total={publisherList.length}
        buffer={4}
      ></VirtualizedGrid>
      {getFooter()}
    </section>
  );
};

export default PublishersPage;
