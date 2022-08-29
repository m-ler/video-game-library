import { useEffect, Suspense, lazy } from "react";
import GameCard from "../../components/cards/GameCard";
import SkeletonCard from "../../components/skeleton-loading/SkeletonCard";
import SkeletonCardGrid from "../../components/skeleton-loading/SkeletonCardGrid";

const AllGames = () => {

    useEffect(() => {

    }, []);

    const getGameList = async () => {
        const apiKey = 'a2bb4511c7b2410895f09afa44233447';
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);

        console.log(await response.json());
    };

    const gameObj1 = {
        name: "Zelda Majora's Mask",
        platform: "N64, Gamecube",
        image: 'https://media.vandal.net/i/960x720/4-2020/20204271153596_1.jpg'
    }

    const gameObj2 = {
        name: "Persona 5",
        platform: "PS3, PS4",
        image: 'https://image.api.playstation.com/vulcan/img/rnd/202011/0204/XTbLZ4M3vFxy3WFHB66Ja9qL.jpg'
    }

    const gameObj3 = {
        name: "Metal Gear Rising",
        platform: "PS3, PS4",
        image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2013/02/210635-analisis-metal-gear-rising-revengeance.jpg?itok=9OLJX9hO'
    }

    const gameObj4 = {
        name: "Final Fantasy X",
        platform: "PS2, PS4, PC, Nintento Switch",
        image: 'https://areajugones.sport.es/wp-content/uploads/2022/05/final-fantasy-x.jpg'
    }

    return (
        <main className='px-[40px] pb-[20px] max-w-[1920px] w-full grow mx-auto flex flex-col gap-y-[20px] overflow-auto'>
            <h1 className='text-text1 dark:text-text1-dark text-4xl font-Lato font-black ' >All games</h1>
            {/* <Suspense fallback=''>

</Suspense> */}

            <div className='grid grid-cols-card-grid gap-[20px]'>
                <GameCard game={gameObj1}></GameCard>
                <GameCard game={gameObj2}></GameCard>
                <GameCard game={gameObj3}></GameCard>
                <GameCard game={gameObj4}></GameCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
                <SkeletonCard></SkeletonCard>
            </div>
            {/* <SkeletonCardGrid></SkeletonCardGrid> */}
        </main>
    );
};

export default AllGames;