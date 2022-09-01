import { cloneElement } from 'react';
import { FaWindows, FaLinux, FaPlaystation, FaXbox, FaApple, FaChrome } from 'react-icons/fa';
import { SiNintendoswitch, SiIos, SiSega } from 'react-icons/si';
import { DiAndroid } from 'react-icons/di';

const getCompressedImageURL = (imgURL) => {
    imgURL = imgURL.split('/media/');
    imgURL.splice(1, 0, '/media/crop/600/400/');
    return imgURL.join('');
};

const platformIconDictionary = {
    'PC': <FaWindows></FaWindows>,
    'Linux': <FaLinux></FaLinux>,
    'PlayStation': <FaPlaystation></FaPlaystation>,
    'Xbox': <FaXbox></FaXbox>,
    'Nintendo': <SiNintendoswitch></SiNintendoswitch>,
    'SEGA': <SiSega></SiSega>,
    'Apple Macintosh': <FaApple></FaApple>,
    'iOS': <SiIos></SiIos>,
    'Android': <DiAndroid></DiAndroid>,
    'Web': <FaChrome></FaChrome>
};

const getPlatformIconList = platforms => {
    const iconList = [];
    platforms.map((platform, index) => {
        const icon = platformIconDictionary[platform];
        iconList.push(
            !!icon ? cloneElement(icon, {key: index, size: '15px'}) : platform
        );
    });
    return iconList;
};

const GameCard = (props) => {
    const platforms = props.game?.parent_platforms?.map(platform => platform.platform.name);
    const platformIcons = getPlatformIconList(platforms);
    return (
        <div data-rol='game-card' className="flex flex-col bg-neu1-1  dark:bg-neu1-9 drop-shadow-md rounded-xl p-[20px] gap-y-[15px] animate-[fadeIn_0.3s_ease-in]">
            <img loading="lazy" src={getCompressedImageURL(props.game.background_image)} className='max-h-[200px] min-h-[200px] object-cover rounded-lg cursor-pointer'></img>
            <div className="flex flex-col gap-y-[5px]">
                <a href='http://www.google.com' className="text-neu1-9 dark:text-neu1-2 font-Roboto font-bold text-[20px]">{props.game.name}</a>
                <span className="flex flex-wrap gap-[10px] text-neu1-6 dark:text-neu1-4 font-OpenSans font-medium text-[16px]">{platformIcons}</span>
                <span className="text-neu1-5 dark:text-neu1-5 font-OpenSans font-medium text-[14px]">{new Date(props.game.released).getFullYear()}</span>
            </div>
        </div>
    )
};

export default GameCard;