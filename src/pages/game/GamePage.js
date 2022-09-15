import { cloneElement, useEffect } from "react";
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner";
import { getGameDetail, getGameDetailScreenshots } from "../../utils/apiRequests";
import useApiRequest from "../../hooks/useApiRequest";
import { Link, useParams } from 'react-router-dom';
import { getHighCompressedImageURL } from "../../utils/compressedImageURLS";
import MetacriticIcon from "../../assets/icons/MetacriticIcon";
import getMetascoreColor from "../../utils/getMetascoreColor";
import { FaExternalLinkAlt } from 'react-icons/fa';
import platformIcons from "../../utils/platformIcons";
import platformColors from "../../utils/platformColors";

const getPlatformColor = (platformName) => {
    return platformColors[platformName] || '#000000';
};

const getImagePreview = (url, key) => {
    return <img className="cursor-pointer w-full rounded-md" key={key} src={getHighCompressedImageURL(url)}></img>;
};

const getPlatformChip = (plaformName, key) => {
    const platformIcon = platformIcons[plaformName] || null;
    return (
        <Link to='/' className="px-[20px] py-[8px] rounded flex items-center gap-x-[10px] hover:scale-105 hover:drop-shadow-lg duration-100 "
            style={{ backgroundColor: getPlatformColor(plaformName) }} key={key}
        >
            {platformIcon && cloneElement(platformIcon, { className: "text-white" })}
            <span className="font-OpenSans text-white font-semibold text-[14px]">{plaformName}</span>
        </Link>
    )
};

const getGenreChip = (genreName, key) => {
    return (
        <Link to='/' className="px-[15px] py-[6px] rounded-md bg-neu1-3 dark:bg-neu1-8 hover:bg-accent1 dark:hover:bg-accent1 group duration-100" key={key}>
            <span className="font-OpenSans text-neu1-7 dark:text-neu1-3 font-bold text-[14px] group-hover:text-neu1-2">{genreName}</span>
        </Link>

    )
};

const getDeveloperChip = (devName, key) => {
    return (
        <Link to='/' className="px-[15px] py-[6px] rounded-md bg-neu1-3 dark:bg-neu1-8 hover:bg-accent1 dark:hover:bg-accent1 group duration-100" key={key}>
            <span className="font-OpenSans text-neu1-7 dark:text-neu1-3 font-bold text-[14px] group-hover:text-neu1-2">{devName}</span>
        </Link>

    )
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
                        <div className="bg-neu1-1/20 dark:bg-neu1-10/20 p-[15px] rounded-md backdrop-blur-xl shadow-lg max-h-[433px] overflow-auto">
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
                    (!!gameRequest.data.platforms && gameRequest.data.platforms.length > 0) &&
                    <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
                        <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Platforms</h3>
                        <div className="mt-[20px] flex flex-wrap gap-[10px]">
                            {
                                gameRequest.data.platforms.map((platform, index) => getPlatformChip(platform.platform.name, index))
                            }
                        </div>
                    </section>
                }

                {
                    (!!gameRequest.data.genres && gameRequest.data.genres.length > 0) &&
                    <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
                        <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Genres</h3>
                        <div className="mt-[15px] flex flex-wrap gap-[10px]">
                            {
                                gameRequest.data.genres.map((genre, index) => getGenreChip(genre.name, index))
                            }
                        </div>
                    </section>
                }

                {
                    (!!gameRequest.data.developers && gameRequest.data.developers.length > 0) &&
                    <section className="z-[2] relative mx-auto max-w-[1000px] py-[20px] border-b border-neu1-3 dark:border-neu1-7 flex flex-col">
                        <h3 className="text-[28px] font-Lato font-black text-neu1-8 dark:text-neu1-2 block">Developers</h3>
                        <div className="mt-[15px] flex flex-wrap gap-[10px]">
                            {
                                gameRequest.data.developers.map((dev, index) => getDeveloperChip(dev.name, index))
                            }
                        </div>
                    </section>
                }

                {
                    !!gameRequest.data.metacritic &&
                    <div className="mx-auto max-w-min bg-neu1-1 dark:bg-neu1-9 mt-[20px] rounded flex flex-col p-[15px] gap-x-[15px] items-center">

                        <div className="flex items-center justify-center gap-x-[10px]">
                            <span className={`flex items-center text-center ${getMetascoreColor(gameRequest.data.metacritic)} text-white font-System font-black text-[20px] p-[7px] max-h-[40px] max-w-[40px] rounded`}>{gameRequest.data.metacritic}</span>
                            <MetacriticIcon width={150} color={theme === 'dark' ? "white" : "black"}></MetacriticIcon>
                        </div>
                        {
                            !!gameRequest.data.metacritic_url &&
                            <a target='blank' href={gameRequest.data.metacritic_url} className='flex items-center gap-x-[10px] text-neu1-8 dark:text-neu1-2 hover:underline font-Raleway text-[12px] font-bold ml-auto'>
                                Read reviews
                                <FaExternalLinkAlt className="max-w-[10px]"></FaExternalLinkAlt>
                            </a>
                        }
                    </div>
                }
            </main>
    );
};

export default GamePage;