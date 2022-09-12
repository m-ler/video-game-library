import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner";
import { getGameDetail, getGameDetailScreenshots } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import { Link, useParams } from 'react-router-dom';
import { getHighCompressedImageURL } from "../../utils/compressedImageURLS";

const getPlatformColor = (platformName) => {
    const platformColors = {
        'PC': '#000000',
        'PlayStation 5': '#003791',
        'Nintendo Switch': '#e60012',
        'PlayStation 4': '#003791',
        'Xbox One': '#107C10',
        'Xbox Series S/X': '#107C10',
        'iOS': '#000000',
        'Android': '#78C257',
        'Nintendo 3DS': '#e60012',
        'Nintendo DS': '#e60012',
        'Nintendo DSi': '#e60012',
        'macOS': '#000000',
        'Linux': '#003366',
        'Xbox 360': '#8CC63F',
        'Xbox': '#8CC63F',
        'PlayStation 3': '#003791',
        'PlayStation 2': '#003791',
        'PlayStation': '#003791',
        'PS Vita': '#003791',
        'PSP': '#003791',
        'Wii U': '#009ac7',
        'Wii': '#009ac7',
        'GameCube': '#2F1B66',
        'Nintendo 64': '#0A1EAA',
        'Game Boy Advance': '#2F1B66',
        'Game Boy Color': '#2F1B66',
        'Game Boy': '#306230',
        'SNES': '#4f43ae',
        'NES': '#e60012',
        'Classic Macintosh': '#000000',
        'Apple II': '#000000',
        'Commodore / Amiga': '#0070E8',
        'Atari 7800': '#F30A09',
        'Atari 5200': '#F30A09',
        'Atari 2600': '#F30A09',
        'Atari Flashback': '#F30A09',
        'Atari 8-bit': '#F30A09',
        'Atari ST': '#F30A09',
        'Atari Lynx': '#F30A09',
        'Atari XEGS': '#F30A09',
        'Genesis': '#17569b',
        'SEGA Saturn': '#17569b',
        'SEGA CD': '#17569b',
        'SEGA 32X': '#17569b',
        'SEGA Master System': '#17569b',
        'Dreamcast': '#17569b',
        '3DO': '#000000',
        'Jaguar': '#000000',
        'Game Gear': '#17569b',
        'Neo Geo': '#00A2E7',
        'Web': '#000000',
    };

    return platformColors[platformName] || '#000000';
};

const getImagePreview = (url, key) => {
    return <img className="cursor-pointer w-full rounded-md" key={key} src={getHighCompressedImageURL(url)}></img>;
};

const getPlatformChip = (plaformName, key) => {
    return <Link to='/' className="px-[20px] py-[8px] rounded" style={{ backgroundColor: getPlatformColor(plaformName) }} key={key}><span className="font-OpenSans text-white font-semibold text-[14px]">{plaformName}</span></Link>
};

const getGenreChip = (genreName, key) => {
    return <Link to='/' className="px-[15px] py-[6px] rounded-md bg-neu1-5  dark:bg-neu1-8" key={key}><span className="font-OpenSans text-neu1-2 font-semibold text-[14px]">{genreName}</span></Link>
};

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

        gameRequest.loading || !gameRequest.data ?
            <ColorRing visible={true} height="80" width="80" wrapperClass="blocks-wrapper" colors={['#0F74E7', '#00CDDB', '#FF74AD', '#0F74E7', '#FF74AD']} /> :
            <main className="relative grow z-0 w-full bg-neu-1 dark:bg-neu1-10 pt-[30px] pb-[50px] px-[20px] overflow-auto">
                <div className={`z-[0] absolute top-[0px] left-[0px] right-[0px] min-h-[600px] bg-no-repeat bg-cover`} style={{ backgroundImage: `url("${gameRequest.data.background_image}")` }}></div>
                <div className="z-[1] absolute top-[0px] left-[0px] right-[0px] min-h-[600px]"
                    style={{ background: theme == 'dark' ? 'linear-gradient(rgba(31,41,51,.65), #1F2933)' : 'linear-gradient(rgba(229,231,235,.65), #e5e7eb)' }}>
                </div>

                <section className="z-[2] relative mx-auto max-w-[1000px] flex flex-wrap justify-between gap-[20px] border-b border-neu1-3 dark:border-neu1-7 pb-[20px]">
                    <div className="min-w-[min(100%,400px)] max-w-[490px] mx-auto">
                        <h1 className="text-neu1-9 dark:text-neu1-1 font-System text-[48px] font-black mb-[25px] leading-[50px]">{gameRequest.data.name}</h1>
                        <div className="bg-neu1-1/20 dark:bg-neu1-10/20 p-[15px] rounded-md backdrop-blur-xl shadow-lg">
                            <h3 className="text-neu1-9 dark:text-neu1-2 font-Lato font-black text-[20px] mb-[10px]">Description</h3>
                            <p className="text-neu1-7 dark:text-neu1-3 font-Roboto font-medium text-[14px]">{gameRequest.data.description_raw}</p>
                        </div>
                    </div>

                    {
                        screenshotsRequest.loading || !screenshotsRequest.data ? "" :
                            <div className="bg-neu1-1/20 dark:bg-neu1-10/20 backdrop-blur-xl shadow-lg min-w-[min(100%,400px)] max-w-[490px] gap-[15px] mx-auto grow overflow-auto box-border p-[15px] rounded-md grid mt-auto"
                                style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(200px, 100%), 1fr))` }}>
                                {screenshotsRequest.data.results.map((img, index) => getImagePreview(img.image, index))}
                            </div>
                    }
                </section>

                {
                    !!gameRequest.data.platforms ?
                        <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
                            <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Platforms</h3>
                            <div className="mt-[20px] flex flex-wrap gap-[10px]">
                                {
                                    gameRequest.data.platforms.map((platform, index) => getPlatformChip(platform.platform.name, index))
                                }
                            </div>
                        </section> : ''
                }

                {
                    !!gameRequest.data.genres ?
                        <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
                            <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Genres</h3>
                            <div className="mt-[20px] flex flex-wrap gap-[10px]">
                                {
                                    gameRequest.data.genres.map((genre, index) => getGenreChip(genre.name, index))
                                }
                            </div>
                        </section> : ''
                }


            </main>
    );
};

export default GamePage;