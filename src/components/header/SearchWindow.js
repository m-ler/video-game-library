import { useRef } from "react";
import { Overlay } from "react-overlays";

const SearchWindow = props => {
  const overlayContainer = useRef();
  //console.log(props)
  return (
    <div>
      <h1>ONLY LOVE IS WITH US NOW</h1>
    </div>
  );
};

export default SearchWindow;

/* <Overlay
        show={!!props.show}
        rootClose={true}
        offset={[0, 10]}
        onHide={() => console.log("search window hidden")}
        placement="bottom-start"
        container={document.querySelector("#root")}
        target={props.targetElement}
      >
      {({ props, arrowProps, placement }) => (
        <h1 {...props} placement={placement} className="bg-accent1 text-white p-[20px] block w-[min(calc(100%-40px),1000px)]">
        SEARCH WINDOW
        </h1>
        )}
      </Overlay> */
