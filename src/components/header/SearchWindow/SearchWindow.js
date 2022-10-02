import { useRef, useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import useApiRequest from "../../../hooks/useApiRequest";
import { getGameSearchList } from "../../../utils/apiRequests";
import SearchWindowGames from "./SearchWindowGames";

const SearchWindow = props => {
  const theme = useSelector(state => state.theme);
  const gameSearchRequest = useApiRequest(() => getGameSearchList(props.searchQuery));
  const previousQuery = useRef("");

  const queryChanged = () => props.searchQuery.replace(/\s/g, "") !== previousQuery.current.replace(/\s/g, "");

  useEffect(() => {
    if (props.searchQuery === "" || !props.searchQuery || gameSearchRequest.loading || !queryChanged()) return;
    previousQuery.current = props.searchQuery;
    gameSearchRequest.makeRequest();
  }, [props.searchQuery]);

  const getView = () => {
    return !props.searchQuery ? (
      ""
    ) : gameSearchRequest.loading ? (
      <div className="w-full flex justify-center">
        <TailSpin
          height="40"
          width="40"
          color={theme === "dark" ? "#616E7C" : "#9AA5B1"}
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
      </div>
    ) : (
      <SearchWindowGames
        itemOnClick={props.itemOnClick}
        games={gameSearchRequest.data?.results || []}
      ></SearchWindowGames>
    );
  };

  return (
    <div className="backdrop-blur-xl bg-neu1-1/95 dark:bg-neu1-10/95 border border-neu1-5 rounded-[10px] p-[20px] w-[max(100%,260px)] block drop-shadow-xl origin-top animate-[fadeIn_0.15s]">
      {getView()}
    </div>
  );
};

export default SearchWindow;
