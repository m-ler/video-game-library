import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import useApiRequest from "../../../hooks/useApiRequest";
import { getGameSearchList } from "../../../utils/apiRequests";
import SearchWindowGames from "./SearchWindowGames";

const SearchWindow = props => {
  const theme = useSelector(state => state.theme);
  const gameSearchRequest = useApiRequest(() => getGameSearchList(props.searchQuery));

  useEffect(() => {
    if (props.searchQuery === "" || !props.searchQuery || gameSearchRequest.loading) return;
    gameSearchRequest.makeRequest();
  }, [props.searchQuery]);

  return (
    <div className="backdrop-blur-xl bg-neu1-10/95 border border-neu1-5 rounded-[10px] p-[20px] w-full block drop-shadow-xl">
      {gameSearchRequest.loading ? (
        <div className="w-full flex justify-center">
          <TailSpin
            height="40"
            width="40"
            color={theme === "dark" ? "#616E7C" : "#9AA5B1"}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <SearchWindowGames games={gameSearchRequest.data?.results || []}></SearchWindowGames>
      )}
    </div>
  );
};

export default SearchWindow;
