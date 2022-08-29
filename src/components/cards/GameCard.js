
const GameCard = (props) => {


    return (
        <div className="flex flex-col bg-white dark:bg-base1/70 drop-shadow-md rounded-xl p-[20px] gap-y-[15px]">
            <img src={props.game.image} className='max-h-[200px] min-h-[200px] object-cover rounded-lg cursor-pointer'></img>
            <div className="flex flex-col">
                <span className="text-text1 dark:text-text2-dark font-Roboto font-bold text-[20px]">{props.game.name}</span>
                <span className="text-text2 dark:text-text2-dark/70 font-OpenSans font-medium text-[16px]">{props.game.platform}</span>
            </div>
        </div>
    )
};

export default GameCard;