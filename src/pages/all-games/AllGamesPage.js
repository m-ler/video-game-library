import { useEffect, useState, useRef } from "react";
import GameCard from "../../components/cards/GameCard";
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner";
import VirtualizedGrid from "../../components/containers/VirtualizedGrid";
import { getGameList } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";

const AllGamesPage = () => {
    const requestsEnabledState = useSelector(state => state.request);

    const [loadedContent, setLoadedContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const gamesRequest = useApiRequest(() => getGameList(currentPage));

    const observer = useRef();
    const listContainerElement = useRef();
    const visor = useRef();

    const updateIntersectionObserver = () => {
        if (gamesRequest.loading) return;
        !!observer.current && observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            entries[0].isIntersecting && setCurrentPage(currentPage + 1);
        }, { threshold: 1 });

        !!visor.current && observer.current.observe(visor.current);
    };

    useEffect(() => {
        if (gamesRequest.loading) return;
        gamesRequest.makeRequest();
    }, [currentPage]);

    useEffect(() => {
        !!gamesRequest.data && setLoadedContent([...new Set([...loadedContent, ...gamesRequest.data.results])]);
    }, [gamesRequest.data]);

    useEffect(() => {
        updateIntersectionObserver();
    }, [gamesRequest.loading, requestsEnabledState]);

    useEffect(() => {
        document.title = 'All games';
    }, []);


    const getFooter = () => {
        return (
            gamesRequest.error ?
                <div><h1 className="text-[48px] font-System text-center font-extrabold dark:text-white">SOMETHING WENT WRONG</h1></div> :
                gamesRequest.loading ?
                    <div className="flex justify-center w-full border-t-[1px] border-neu1-2 dark:border-neu1-9 py-[15px]">
                        <ColorRing visible={true} height="80" width="80" wrapperClass="blocks-wrapper" colors={['#0F74E7', '#00CDDB', '#FF74AD', '#0F74E7', '#FF74AD']} />
                    </div> :
                    <div ref={visor} className='block w-full h-[150px] mb-[10px]'></div>
        );
    };

    const gridElement = (index) => <GameCard key={index} game={loadedContent[index]}></GameCard>

    return (
        <main ref={listContainerElement} className='px-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto max-h-full'>

            <VirtualizedGrid
                rowHeight={337}
                columnWidth={320}
                gapX={20}
                gapY={20}
                childElement={gridElement}
                total={loadedContent.length}
                buffer={1}//
                scrollContainer={listContainerElement.current}
                header={<h1 className='text-neu1-10 dark:text-neu1-1 font-System text-[60px] font-black mb-[25px]' >All Games</h1>}
                footer={getFooter()}
            ></VirtualizedGrid>
        </main>
    );
};

export default AllGamesPage;