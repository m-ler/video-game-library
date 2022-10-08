import { debounce } from "lodash";
import { useState, useRef, useMemo } from "react";
import { MdSearch } from "react-icons/md";
import withOverlay from "../../hoc/overlays/withOverlay";
import regularExpressions from "../../utils/regularExpressions";
import SearchWindow from "./SearchWindow/SearchWindow";

const SearchBar = () => {
  const searchBarElement = useRef();
  const searchInputElement = useRef();
  const [showSearchWindow, setShowSearchWindow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const SearchWindowWithOverlay = useMemo(
    () =>
      withOverlay(SearchWindow, {
        elementTarget: searchBarElement.current,
        position: "bottom-left",
        anchor: "top-left",
        margin: { x: 0, y: 15 },
        sameWidth: true,
      }),
    [searchBarElement.current]
  );

  const handleOnInput = e => {
    setSearchQuery(e.target.value);
    console.log(regularExpressions.isEmpty.test(e.target.value));
    setShowSearchWindow(!regularExpressions.isEmpty.test(e.target.value));
  };

  return (
    <div
      className="border border-neu1-4 dark:border-neu1-6  p-2.5 h-9 gap-x-2.5 rounded-full flex items-center px-5 mx-auto max-w-[800px] w-full"
      ref={searchBarElement}
    >
      <MdSearch size={"24px"} className="text-neu1-7 dark:text-text2-dark "></MdSearch>
      <input
        type="text"
        placeholder="Search games"
        className="bg-transparent outline-0 text-neu1-10 dark:text-neu1-1 text-sm placeholder:font-normal placeholder:text-l-on-sec-c/40 dark:placeholder:text-d-on-sec-c/40 w-full font-OpenSans font-semibold"
        autoComplete="off"
        spellCheck="false"
        onFocus={() => setShowSearchWindow(true)}
        onInput={useMemo(() => debounce(e => handleOnInput(e), 300), [])}
        ref={searchInputElement}
      ></input>

      <SearchWindowWithOverlay
        show={showSearchWindow}
        setShow={setShowSearchWindow}
        searchQuery={searchQuery}
        resultOnSelect={selectedResult => {
          searchInputElement.current.value = selectedResult;
          setShowSearchWindow(false);
        }}
      ></SearchWindowWithOverlay>
    </div>
  );
};

export default SearchBar;
