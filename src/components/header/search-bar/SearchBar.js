import { useEffect } from "react";
import { useState, useRef } from "react";
import { MdSearch } from "react-icons/md";
import regularExpressions from "../../../utils/regularExpressions";
import SearchBarHotkey from "./SearchBarHotkey";
import SearchDropdown from "./search-dropdown/SearchDropdown";

const SearchBar = () => {
  const searchBarElementRef = useRef();
  const searchInputElementRef = useRef();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);

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
    clickedOutside && setShowSearchDropdown(false);
  };

  const onInput = e => {
    setSearchQuery(e.target.value);
    setShowSearchDropdown(true);
  };

  const onKeyDown = e => {
    if (e.ctrlKey && e.key == "k") {
      e.preventDefault();
      searchInputElementRef.current.focus();
    }
  };

  return (
    <div
      className="relative border border-neu1-4 dark:border-neu1-6 px-[16px] sm:px-[12px] py-[8px] sm:py-[2px] gap-x-2.5 rounded-full flex items-center px-5 mx-auto max-w-[800px] w-full"
      ref={searchBarElementRef}
    >
      <MdSearch size={"22px"} className="text-neu1-7 dark:text-text2-dark max-w-[22px] sm:max-w-[16px]"></MdSearch>
      <input
        type="text"
        placeholder="Search games"
        className="bg-transparent outline-0 text-neu1-10 dark:text-neu1-1 text-sm placeholder:font-normal placeholder:text-l-on-sec-c/40 dark:placeholder:text-d-on-sec-c/40
        w-full font-OpenSans font-semibold text-[16px] sm:text-[14px]"
        autoComplete="off"
        spellCheck="false"
        onBlur={() => setFocused(false)}
        onFocus={() => {
          setShowSearchDropdown(true);
          setFocused(true);
        }}
        onInput={onInput}
        ref={searchInputElementRef}
      ></input>

      <SearchBarHotkey focused={focused}></SearchBarHotkey>

      {showSearchDropdown && (
        <SearchDropdown
          searchQuery={searchQuery}
          show={showSearchDropdown}
          setShowSearchDropdown={setShowSearchDropdown}
          searchInputRef={searchInputElementRef}
          resultOnSelect={selectedResult => {
            searchInputElementRef.current.value = selectedResult;
            setShowSearchDropdown(false);
          }}
        ></SearchDropdown>
      )}
    </div>
  );
};

export default SearchBar;
