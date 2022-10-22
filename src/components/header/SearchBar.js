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
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  const onDocumentClick = e => {
    const clickedOutside = !searchBarElementRef.current.contains(e.target);
    clickedOutside && setShowSearchWindow(false);
  };

  const handleKeyDown = useMemo(
    () =>
      debounce(e => {
        if (locked) return;
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
        onKeyDown={handleKeyDown}
        ref={searchInputElementRef}
      ></input>

      <SearchBarHotkey focused={showSearchWindow}></SearchBarHotkey>

      <SearchWindow
        searchQuery={searchQuery}
        setShowSearchWindow={setShowSearchWindow}
        setInputLocked={setLocked}
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
