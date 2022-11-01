import { useEffect, useRef, useState } from "react";
import useOverflowChange from "../../hooks/useOverflowChange";

const VirtualizedGrid = props => {
  const [columnCount, setColumnCount] = useState(1);
  const [columnWidth, setColumnWidth] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState([]);

  const resizeObserver = useRef();
  const gridParentElement = useRef();
  const ghostGrid = useRef();
  const header = useRef();
  const footer = useRef();
  const intersectionsNodesRef = useRef();
  const intersectionsNodesParentRef = useRef();

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      updateLayout();
    });

    resizeObserver.current.observe(ghostGrid.current);
    gridParentElement.current.scrollTop = props.initialScroll || 0;

    const intersectionNodeMargin = (props.rowHeight + props.gapY) * props.buffer;
    intersectionsNodesRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setVisibleNodes(prev => {
            const nodeIndex = parseInt(entry.target.getAttribute("data-index"));
            const newState = [...prev];
            newState[nodeIndex] = entry.isIntersecting;
            return newState;
          });
        });
      },
      { rootMargin: `${intersectionNodeMargin}px 0px 0px 0px` }
    );

    return () => {
      resizeObserver.current.disconnect();
      intersectionsNodesRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    updateLayout();
  }, [columnCount]);

  useEffect(() => {
    if (!intersectionsNodesRef.current) return;
    intersectionsNodesRef.current.disconnect();
    [...intersectionsNodesParentRef.current.children].forEach(node => intersectionsNodesRef.current.observe(node));
  }, [props.total, columnCount]);

  useOverflowChange(hasOverflow => {
    gridParentElement.current.classList.toggle("pr-[10px]", hasOverflow);
  }, gridParentElement);

  const updateLayout = () => {
    const templateColumns = window.getComputedStyle(ghostGrid.current).getPropertyValue("grid-template-columns");
    setColumnWidth(parseFloat(templateColumns.split("px ")[0]));
    !!ghostGrid.current && setColumnCount(templateColumns.split(" ").length);
  };

  const getIntersectionNodes = () => {
    const intersectionList = [];
    for (let i = 0; i < Math.ceil(props.total / columnCount) / props.buffer; i++) {
      intersectionList.push(
        <span
          key={i}
          data-index={i}
          className="invisible block absolute"
          style={{
            top: parseInt((props.rowHeight + props.gapY) * (i * props.buffer)),
          }}
        ></span>
      );
    }
    return intersectionList;
  };

  const getVisibleElements = () => {
    const visibleElements = [];

    for (let i = 0; i < props.total; i++) {
      const isVisible = visibleNodes[Math.floor(i / columnCount / props.buffer)];
      if (!isVisible) continue;

      const style = {
        position: "absolute",
        top: parseInt(i / columnCount) * (props.rowHeight + props.gapY),
        left: (columnWidth + props.gapX) * (i % columnCount),
        width: columnWidth,
        height: props.rowHeight,
        maxHeight: props.rowHeight,
        zIndex: props.total - i,
      };
      visibleElements.push(
        <div style={style} key={i}>
          {props.childElement(i)}
        </div>
      );
    }
    return visibleElements;
  };

  const getHeight = () => Math.ceil(props.total / columnCount) * (props.rowHeight + props.gapY);

  const getGhostGridContent = () => {
    const content = [];
    for (let i = 0; i < columnCount; i++) content.push(<div key={i}></div>);
    return content;
  };

  return (
    <div ref={gridParentElement} className="flex flex-col sm:scrollbar-hide sm:pr-[0px]">
      <div ref={header} className="box-border">
        {props.header || ""}
      </div>
      <div
        ref={ghostGrid}
        style={{
          rowGap: props.gapX || 0,
          columnGap: props.gapY || 0,
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${props.columnWidth}px, 100%), 1fr))`,
        }}
        className={`grid w-full block`}
      >
        {getGhostGridContent()}
      </div>
      <div style={{ minHeight: getHeight() || 0 }} className="relative w-full  z-0">
        <div ref={intersectionsNodesParentRef}>{getIntersectionNodes()}</div>
        {getVisibleElements()}
      </div>
      <div ref={footer} className="box-border">
        {props.footer || ""}
      </div>
    </div>
  );
};

export default VirtualizedGrid;
