import { useState, useEffect, useRef } from "react";
import SpinnerA from "../../components/elements/loading-animations/SpinnerA";
import useApiRequest from "../../hooks/useApiRequest";
import { getPlatformList } from "../../utils/apiRequests";
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

  useEffect(() => {
    currentPage > 0 && platformsRequest.makeRequest();
  }, [currentPage]);

  useEffect(() => {
    setPlatformList([...platformList, ...(platformsRequest.data?.results || [])]);
    updateIntersectionObserver();
  }, [platformsRequest.data]);

  const getFooter = () => {
    return platformsRequest.error ? (
      <h1>SOMETHING WENT WRONG</h1>
    ) : platformsRequest.loading ? (
      <SpinnerA></SpinnerA>
    ) : (
      <div ref={intersectionElement} className="min-h-[40px] my-[20px]"></div>
    );
  };

  return (
    <div className="px-[20px] pt-[20px] pb-[50px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full z-0">
      <h1 className="text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black">Platforms</h1>
      <PlatformList platforms={platformList}></PlatformList>
      {getFooter()}
    </div>
  );
};

export default PlatformsPage;
