const IconButton = props => {
  return (
    <button
      className="relative aspect-square outline-0 before:content-[''] before:absolute before:bg-black/10 dark:before:bg-white/20 before:w-full before:z-[-1] z-0 before:duration-200
        before:h-full before:top-0 before:left-0 before:rounded-[50px] before:scale-[1.35] before:opacity-0 hover:before:opacity-100 focus:before:opacity-100"
      {...props}
    >
      {props.children}
    </button>
  );
};
export default IconButton;
