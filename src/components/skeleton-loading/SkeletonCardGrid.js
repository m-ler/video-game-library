import SkeletonCard from "./SkeletonCard";


const SkeletonCardGrid = () => {

    return (
        <div className='grid grid-cols-card-grid gap-[20px]'>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
        </div>
    );
};

export default SkeletonCardGrid;