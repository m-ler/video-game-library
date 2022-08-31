import { useEffect, useState, useRef } from "react";
import SkeletonCard from "../../components/skeleton-loading/SkeletonCard";
import GameCard from "../../components/cards/GameCard";
import { useSelector } from 'react-redux';

const getGameList = async (page) => {
    const apiKey = 'a2bb4511c7b2410895f09afa44233447';
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=30`);
    return await response.json();
};


const gameObj1 = {
    name: "Zelda Majora's Mask",
    platform: "N64, Gamecube",
    image: 'https://media.vandal.net/i/960x720/4-2020/20204271153596_1.jpg'
};

const AllGames = () => {

    const [loadedContent, setLoadedContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    const doRequestsState = useSelector(state => state.request);

    const updateList = async () => {
        if (!doRequestsState) return;
        setFetching(true);
        const response = await getGameList(currentPage);

        setLoadedContent([...new Set([...loadedContent, ...response.results])]);
        setFetching(false);
        updateIntersectionObserver();
    };

    const observer = useRef();
    const listContainerElement = useRef();
    const lastGameCardElement = useRef();
    const updateIntersectionObserver = () => {
        if (fetching) return;
        !!observer.current && observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log("SETTING");
                setCurrentPage(currentPage + 1);
            }
        });

        console.log(lastGameCardElement);
        !!lastGameCardElement.current && observer.current.observe(lastGameCardElement.current);
    };

    useEffect(() => {
        updateList();
    }, [currentPage]);

    return (
        <main ref={listContainerElement} className='px-[40px] pb-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto'>
            <h1 className='text-neu1-10 dark:text-neu1-1 text-4xl font-Lato font-black ' >All games</h1>

            <div className='grid grid-cols-card-grid gap-[20px]'>
                {
                    loadedContent.map((gameData, index) => {
                        console.log("rendered");
                        if (loadedContent.length === index + 1) return <GameCard key={index} game={gameData}></GameCard>
                        return <GameCard key={index} game={gameData}></GameCard>
                    })
                }
            </div>

            {fetching && `<div>LOADING...</div>`}

            {/* <SkeletonCardGrid></SkeletonCardGrid> */}
        </main>
    );
};

export default AllGames;