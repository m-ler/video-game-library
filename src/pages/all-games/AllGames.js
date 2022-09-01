import { useEffect, useState, useRef } from "react";
import GameCard from "../../components/cards/GameCard";
import { useSelector } from 'react-redux';
import { RevolvingDot } from "react-loader-spinner";
import { Virtuoso } from "react-virtuoso";

const getGameList = async (page) => {
    const apiKey = 'a2bb4511c7b2410895f09afa44233447';
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=30`);
    return await response.json();
};

const AllGames = () => {

    const [loadedContent, setLoadedContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    const doRequestsState = useSelector(state => state.request);
    const theme = useSelector(state => state.theme);

    const updateList = async () => {
        if (!doRequestsState) return;
        setFetching(true);
        const response = await getGameList(currentPage);

        setLoadedContent([...new Set([...loadedContent, ...response.results])]);
        setFetching(false);
    };

    const observer = useRef();
    const listContainerElement = useRef();
    let lastGameCardElement = null;
    const updateIntersectionObserver = () => {
        if (fetching) return;
        !!observer.current && observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setCurrentPage(currentPage + 1);
            }
        }, { threshold: 0 });

        !!lastGameCardElement && observer.current.observe(lastGameCardElement);
    };

    useEffect(() => {
        updateList();
    }, [currentPage]);

    useEffect(() => {
        if (fetching) return;
        lastGameCardElement = listContainerElement.current.querySelector("[data-rol='game-card']:last-child") ?? null;
        updateIntersectionObserver();
    }, [fetching, doRequestsState]);

    return (
        <main ref={listContainerElement} className='px-[40px] pb-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto'>
                
            <h1 className='text-neu1-10 dark:text-neu1-1 text-4xl font-Lato font-black' >All games</h1>

            <div className='grid grid-cols-card-grid gap-[20px]'>
                {
                    loadedContent.map((gameData, index) => {
                        return <GameCard key={index} game={gameData}></GameCard>
                    })
                }
            </div>

            {
                fetching && <div className="flex justify-center w-full border-t-[1px] border-neu1-2 dark:border-neu1-9 py-[15px]">
                    <RevolvingDot
                        height="100"
                        width="100"
                        radius="3"
                        color="#00CDDB"
                        secondaryColor=''
                        ariaLabel="revolving-dot-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            }


        </main>
    );
};

export default AllGames;