const keyStyle = `border border-neu1-4 dark:border-neu1-6 px-[8px] py-[2px] text-[11px] block h-min rounded-[3px] text-neu1-4 dark:text-neu1-6 font-System font-semibold whitespace-nowrap duration-200`;

const SearchBarHotkey = props => {
  return (
    <div className="flex items-center">
      <span className={keyStyle}>{props.focused ? "Enter" : "Ctrl + k"}</span>
    </div>
  );
};

export default SearchBarHotkey;
