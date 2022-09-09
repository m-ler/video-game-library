import { useEffect, useState, useRef } from "react";
import GameCard from "../../components/cards/GameCard";
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner";
import VirtualizedGrid from "../../components/containers/VirtualizedGrid";

const getGameList = async (page) => {
    const apiKey = 'a2bb4511c7b2410895f09afa44233447';
    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=50`);
        return await response.json();
    }
    catch (error) {
        return false;
    }
};



const AllGames = () => {

    const doRequestsState = useSelector(state => state.request);

    const [loadedContent, setLoadedContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [requestSuccesful, setRequestSuccesful] = useState(true);

    const observer = useRef();
    const listContainerElement = useRef();
    const visor = useRef();

    const updateList = async () => {
        if (!doRequestsState) return;
        setFetching(true);
        const response = await getGameList(currentPage);
        if (response)
            setFetching(false);
        setRequestSuccesful(!!response);
        !!response && setLoadedContent([...new Set([...loadedContent, ...response.results])]);
    };

    const updateIntersectionObserver = () => {
        if (fetching) return;
        !!observer.current && observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setCurrentPage(currentPage + 1);
            }
        }, { threshold: 1 });

        !!visor.current && observer.current.observe(visor.current);
    };

    useEffect(() => {
        if (fetching) return;
        updateList();
    }, [currentPage]);

    useEffect(() => {
        if (fetching) return;
        updateIntersectionObserver();
    }, [fetching, doRequestsState]);


    const getFooter = () => {
        return (
            !requestSuccesful ?
                <div><h1 className="text-[48px] font-system text-center font-extrabold dark:text-white">SOMETHING WENT WRONG</h1></div> :
                fetching ?
                    <div className="flex justify-center w-full border-t-[1px] border-neu1-2 dark:border-neu1-9 py-[15px]">
                        <ColorRing visible={true} height="80" width="80" wrapperClass="blocks-wrapper" colors={['#0F74E7', '#00CDDB', '#FF74AD', '#0F74E7', '#FF74AD']} />
                    </div> :
                    <div ref={visor} className='block w-full h-[150px]'></div>
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
                header={<h1 className='text-neu1-9 dark:text-neu1-2  font-system text-[60px] font-bold mb-[25px] ' >All Games</h1>}
                footer={getFooter()}
            ></VirtualizedGrid>
        </main>
    );
};

export default AllGames;