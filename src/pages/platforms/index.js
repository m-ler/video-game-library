import { useLayoutEffect } from "react";
import { useState, useEffect, useRef } from "react";
import SpinnerA from "../../components/loading-animations/SpinnerA";
import NoMoreResults from "../../components/state-messages/NoMoreResults";
import RequestError from "../../components/state-messages/RequestError";
import useApiRequest from "../../hooks/useApiRequest";
import { getPlatformList } from "../../api/apiRequests";
import PlatformList from "./PlatformList";

const PlatformsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [platformList, setPlatformList] = useState([]);
  const platformsRequest = useApiRequest(() => getPlatformList(currentPage));

  const intersectionElement = useRef();
  const intersectionObserver = useRef();

  const updateIntersectionObserver = () => {
    if (platformsRequest.loading) return;
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
    document.title = "Platforms";
  }, []);

  useLayoutEffect(() => {
    currentPage > 0 && platformsRequest.makeRequest();
  }, [currentPage]);

  useEffect(() => {
    setPlatformList([...platformList, ...(platformsRequest.data?.results || [])]);
    updateIntersectionObserver();
  }, [platformsRequest.data]);

  const getFooter = () => {
    const hasMoreResults = platformsRequest.data?.next !== null;
    return platformsRequest.error ? (
      <RequestError></RequestError>
    ) : platformsRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : !hasMoreResults ? (
      <NoMoreResults></NoMoreResults>
    ) : (
      <div ref={intersectionElement} className="min-h-[40px] my-[20px]"></div>
    );
  };

  return (
    <div className="px-[20px] pt-[20px] pb-[50px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0 mt-[82px] sm:mt-[52px]">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] sm:text-[48px] font-black">Platforms</h1>
      <PlatformList platforms={platformList}></PlatformList>
      {getFooter()}
    </div>
  );
};

export default PlatformsPage;
