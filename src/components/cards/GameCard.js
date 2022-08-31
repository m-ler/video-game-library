
const obtainCompressedImageURL = (imgURL) => {
    imgURL = imgURL.split('/media/');
    imgURL.splice(1, 0, '/media/crop/600/400/');
    return imgURL.join('');
};

const GameCard = (props) => {
    const platforms = props.game?.parent_platforms?.map(platform => platform.platform.name).join(", ");

    return (
        <div className="flex flex-col bg-neu1-1  dark:bg-neu1-9 drop-shadow-md rounded-xl p-[20px] gap-y-[15px]">
            <img loading="lazy" src={obtainCompressedImageURL(props.game.background_image)} className='max-h-[200px] min-h-[200px] object-cover rounded-lg cursor-pointer'></img>
            <div className="flex flex-col">
                <span className="text-neu1-9 dark:text-neu1-2 font-Roboto font-bold text-[20px]">{props.game.name}</span>
                <span className="text-neu1-6 dark:text-neu1-4 font-OpenSans font-medium text-[16px]">{platforms}</span>
            </div>
        </div>
    )
};

export default GameCard;