import { useRef, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import useApiRequest from "../../../../hooks/useApiRequest";
import { getGameSearchList } from "../../../../api/apiRequests";
import regularExpressions from "../../../../utils/regularExpressions";
import SpinnerB from "../../../loading-animations/SpinnerB";
import SearchDropdownResultList from "./SearchDropdownResultList";

const SearchDropdown = props => {
  const gameSearchRequest = useApiRequest(() => getGameSearchList(currentQueryRef.current));
  const previousQueryRef = useRef("");
  const currentQueryRef = useRef("");
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    currentQueryRef.current = props.searchQuery;
    onQueryUpdate();
  }, [props.searchQuery]);

  useEffect(() => {
    setResultList(gameSearchRequest?.data?.results || []);
  }, [gameSearchRequest.data]);

  const queryChanged = () =>
    currentQueryRef.current.replace(regularExpressions.removeSpaces, "") !==
    previousQueryRef.current.replace(regularExpressions.removeSpaces, "");

  const queryIsValid = () =>
    !regularExpressions.isEmpty.test(currentQueryRef.current) && !regularExpressions.allAreSpaces.test(currentQueryRef.current);

  const onQueryUpdate = useMemo(
    () =>
      debounce(() => {
        if (gameSearchRequest.loading || !queryChanged()) return;
        setResultList([]);
        previousQueryRef.current = currentQueryRef.current;
        queryIsValid() && gameSearchRequest.makeRequest();
      }, 300),
    []
  );

  return (
    props.show && (
      <div
        className="bg-neu1-1 dark:bg-neu1-10 border border-neu1-5 rounded-[10px] p-[20px] w-full block drop-shadow-xl 
    origin-top animate-[fadeIn_0.15s] max-h-[50vh] overflow-auto absolute top-[calc(100%+15px)] left-0 empty:hidden"
      >
        {gameSearchRequest.loading && <SpinnerB className="w-full flex justify-center"></SpinnerB>}
        <SearchDropdownResultList {...props} games={resultList}></SearchDropdownResultList>
      </div>
    )
  );
};

export default SearchDropdown;
