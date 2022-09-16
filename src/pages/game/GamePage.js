import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner";
import { getGameDetail, getGameDetailScreenshots } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import { useParams } from 'react-router-dom';
import PlatformsSection from "./PlatformsSection";
import GenresSection from "./GenresSection";
import MainInfoSection from "./MainInfoSection";
import DevelopersSection from "./DevelopersSection";
import MetacriticSection from "./MetacriticSection";
import GamePageSkeleton from "./GamePageSkeleton";

const GamePage = () => {
    const gameId = useParams()['gameId'];
    const theme = useSelector(state => state.theme);
    const gameRequest = useApiRequest(() => getGameDetail(gameId));
    const screenshotsRequest = useApiRequest(() => getGameDetailScreenshots(gameId));

    useEffect(() => {
        gameRequest.makeRequest();
        screenshotsRequest.makeRequest();
    }, []);

    useEffect(() => {
        !!gameRequest.data && (document.title = gameRequest.data.name);
    }, [gameRequest.data])

    return (

        gameRequest.loading || screenshotsRequest.loading || !gameRequest.data ?
            <GamePageSkeleton></GamePageSkeleton> :
            <main className="relative grow z-0 w-full bg-neu-1 dark:bg-neu1-10 pt-[30px] pb-[50px] px-[20px] overflow-auto animate-[fadeIn_0.5s_ease-out]">
                <div className={`z-[0] absolute top-[0px] left-[0px] right-[0px] min-h-[600px] bg-no-repeat bg-cover`} style={{ backgroundImage: `url("${gameRequest.data.background_image}")` }}></div>
                <div className="z-[1] absolute top-[0px] left-[0px] right-[0px] min-h-[600px]"
                    style={{ background: theme == 'dark' ? 'linear-gradient(rgba(31,41,51,.65), #1F2933)' : 'linear-gradient(rgba(229,231,235,.65), #e5e7eb)' }}>
                </div>

                {
                    <MainInfoSection game={gameRequest.data || null} screenshots={screenshotsRequest.data.results || null}></MainInfoSection>
                }

                {
                    <PlatformsSection platforms={gameRequest.data.platforms || null}></PlatformsSection>
                }

                {
                    <GenresSection genres={gameRequest.data.genres || null}></GenresSection>
                }

                {
                    (!!gameRequest.data.developers && gameRequest.data.developers.length > 0) &&
                    <DevelopersSection developers={gameRequest.data.developers}></DevelopersSection>
                }

                {
                    !!gameRequest.data.metacritic &&
                    <MetacriticSection score={gameRequest.data.metacritic} metacriticURL={gameRequest.data.metacritic_url}></MetacriticSection>
                }
            </main>
    );
};

export default GamePage;