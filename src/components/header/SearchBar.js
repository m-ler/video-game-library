import { debounce } from "lodash";
import { useEffect } from "react";
import { useState, useRef, useMemo } from "react";
import { MdSearch } from "react-icons/md";
import regularExpressions from "../../utils/regularExpressions";
import SearchBarHotkey from "./SearchBarHotkey";
import SearchWindow from "./SearchWindow/SearchWindow";

const SearchBar = () => {
  const searchBarElementRef = useRef();
  const searchInputElementRef = useRef();
  const [showSearchWindow, setShowSearchWindow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const onDocumentClick = e => {
    const clickedOutside = !searchBarElementRef.current.contains(e.target);
    clickedOutside && setShowSearchWindow(false);
  };

  const onKeyDown = e => {
    if (e.ctrlKey && e.key == "k") {
      e.preventDefault();
      searchInputElementRef.current.focus();
    }
  };

  const handleInput = useMemo(
    () =>
      debounce(e => {
        setSearchQuery(e.target.value);
        setShowSearchWindow(!regularExpressions.isEmpty.test(e.target.value));
      }, 300),
    []
  );

  return (
    <div
      className="relative border border-neu1-4 dark:border-neu1-6 px[16px] py-[8px] gap-x-2.5 rounded-full flex items-center px-5 mx-auto max-w-[800px] w-full"
      ref={searchBarElementRef}
    >
      <MdSearch size={"22px"} className="text-neu1-7 dark:text-text2-dark min-w-[22px]"></MdSearch>
      <input
        type="text"
        placeholder="Search games"
        className="bg-transparent outline-0 text-neu1-10 dark:text-neu1-1 text-sm placeholder:font-normal placeholder:text-l-on-sec-c/40 dark:placeholder:text-d-on-sec-c/40 w-full font-OpenSans font-semibold"
        autoComplete="off"
        spellCheck="false"
        onFocus={e => !regularExpressions.isEmpty.test(e.currentTarget.value) && setShowSearchWindow(true)}
        onInput={handleInput}
        ref={searchInputElementRef}
      ></input>

      <SearchBarHotkey focused={showSearchWindow}></SearchBarHotkey>

      <SearchWindow
        searchQuery={searchQuery}
        setShowSearchWindow={setShowSearchWindow}
        show={showSearchWindow}
        searchInputRef={searchInputElementRef}
        resultOnSelect={selectedResult => {
          searchInputElementRef.current.value = selectedResult;
          setShowSearchWindow(false);
        }}
      ></SearchWindow>
    </div>
  );
};

export default SearchBar;
