
const SkeletonCard = () => {
    return (
        <div className="flex flex-col animate-pulse bg-white dark:bg-base1/70 drop-shadow-md min-h-[300px] rounded-xl p-[20px] gap-y-[15px]">
            <span className="bg-variation2/20 dark:bg-variation1/10 grow w-full block rounded-lg"></span>
            <span className="bg-variation2/20 dark:bg-variation1/10 h-[25px] w-full block rounded-lg"></span>
            <span className="bg-variation2/20 dark:bg-variation1/10 h-[25px] w-1/2 block rounded-lg"></span>
        </div>  
    );
};

export default SkeletonCard;