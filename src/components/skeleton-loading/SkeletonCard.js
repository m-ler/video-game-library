
const SkeletonCard = () => {
    return (
        <div className="flex flex-col animate-pulse bg-neu1-1 dark:bg-neu1-9 drop-shadow-md min-h-[300px] rounded-xl p-[20px] gap-y-[15px]">
            <span className="bg-neu1-2 dark:bg-neu1-8 grow w-full block rounded-lg"></span>
            <span className="bg-neu1-2 dark:bg-neu1-8 h-[25px] w-full block rounded-lg"></span>
            <span className="bg-neu1-2 dark:bg-neu1-8 h-[25px] w-1/2 block rounded-lg"></span>
        </div>  
    );
};

export default SkeletonCard;