
import React from 'react';

const GameDetailPageSkeleton = () => {
    return (
      <div className="flex flex-col w-full pt-[30px] pb-[50px] px-[20px] overflow-auto">
        <div className="w-full flex flex-wrap justify-between gap-[40px] border-b border-b-neu1-3 dark:border-b-neu1-8 w-[min(1000px,100%)] mx-auto pb-[20px]">
          <div className="min-w-[min(100%,480px)] mx-auto flex flex-col gap-y-[25px] justify-between">
            <span className="rounded-[50px] bg-neu1-3 dark:bg-neu1-9 w-[min(350px,100%)] animate-pulse min-h-[50px]"></span>
            <div className="flex flex-col rounded-md max-h-[433px] overflow-auto">
              <span className="rounded-[50px] bg-neu1-3 dark:bg-neu1-9 w-[min(200px,100%)] animate-pulse min-h-[30px] mb-[15px]"></span>
              <div>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[100%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[80%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[95%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[85%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[100%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[83%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[90%] animate-pulse min-h-[15px] mb-[10px]"></span>
                <span className="block rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[20%] animate-pulse min-h-[15px] mb-[10px]"></span>
              </div>
            </div>
          </div>

          <div
            className="min-w-[min(100%,480px)] mx-auto gap-[15px] grid"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(200px, 100%), 1fr))` }}
          >
            <span className="bg-neu1-3 dark:bg-neu1-9 rounded-[10px] min-h-[110px] animate-pulse"></span>
            <span className="bg-neu1-3 dark:bg-neu1-9 rounded-[10px] min-h-[110px] animate-pulse"></span>
            <span className="bg-neu1-3 dark:bg-neu1-9 rounded-[10px] min-h-[110px] animate-pulse"></span>
            <span className="bg-neu1-3 dark:bg-neu1-9 rounded-[10px] min-h-[110px] animate-pulse"></span>
            <span className="bg-neu1-3 dark:bg-neu1-9 rounded-[10px] min-h-[110px] animate-pulse"></span>
            <span className="bg-neu1-3 dark:bg-neu1-9 rounded-[10px] min-h-[110px] animate-pulse"></span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-[20px] border-b border-b-neu1-3 dark:border-b-neu1-8 w-[min(1000px,100%)] mx-auto py-[20px]">
          <span className="rounded-[50px] bg-neu1-3 dark:bg-neu1-9 w-[min(200px,100%)] animate-pulse min-h-[35px]"></span>
          <div className="flex flex-wrap gap-[10px]">
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 min-w-[125px] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 min-w-[180px] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 min-w-[125px] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 min-w-[100px] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 min-w-[200px] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 min-w-[120px] animate-pulse min-h-[40px]"></span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-[20px] border-b border-b-neu1-3 dark:border-b-neu1-8 w-[min(1000px,100%)] mx-auto py-[20px]">
          <span className="rounded-[50px] bg-neu1-3 dark:bg-neu1-9 w-[min(150px,100%)] animate-pulse min-h-[35px]"></span>
          <div className="flex flex-wrap gap-[10px]">
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(175px,100%)] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(125px,100%)] animate-pulse min-h-[40px]"></span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-[20px] border-b border-b-neu1-3 dark:border-b-neu1-8 w-[min(1000px,100%)] mx-auto py-[20px]">
          <span className="rounded-[50px] bg-neu1-3 dark:bg-neu1-9 w-[min(250px,100%)] animate-pulse min-h-[35px]"></span>
          <div className="flex flex-wrap gap-[10px]">
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(175px,100%)] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(135px,100%)] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(250px,100%)] animate-pulse min-h-[40px]"></span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-[20px] border-b border-b-neu1-3 dark:border-b-neu1-8 w-[min(1000px,100%)] mx-auto py-[20px]">
          <span className="rounded-[50px] bg-neu1-3 dark:bg-neu1-9 w-[min(270px,100%)] animate-pulse min-h-[35px]"></span>
          <div className="flex flex-wrap gap-[10px]">
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(125px,100%)] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(230px,100%)] animate-pulse min-h-[40px]"></span>
            <span className="rounded-[5px] bg-neu1-3 dark:bg-neu1-9 w-[min(180px,100%)] animate-pulse min-h-[40px]"></span>
          </div>
        </div>

        <div className="w-[min(280px,100%)] mx-auto my-[20px] min-h-[80px] bg-neu1-3 dark:bg-neu1-9 rounded-[10px] animate-pulse"></div>
      </div>
    );
};

export default GameDetailPageSkeleton;