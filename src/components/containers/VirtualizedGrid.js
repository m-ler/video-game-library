import { throttle } from "lodash";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import useOverflowChange from "../../hooks/useOverflowChange";

const VirtualizedGrid = props => {
  const [scrollTop, setScrollTop] = useState(0);
  const [columnCount, setColumnCount] = useState(1);
  const [columnWidth, setColumnWidth] = useState(0);

  const resizeObserver = useRef();
  const gridParentElement = useRef();
  const ghostGrid = useRef();
  const header = useRef();
  const footer = useRef();
  const topIndexThreshold = useRef(0);
  const bottomIndexThreshold = useRef(Number.POSITIVE_INFINITY);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      updateLayout();
    });

    resizeObserver.current.observe(ghostGrid.current);
    gridParentElement.current.scrollTop = props.initialScroll || 0;

    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  useEffect(() => {
    updateLayout();
  }, [columnCount]);

  useOverflowChange(hasOverflow => {
    gridParentElement.current.classList.toggle("pr-[10px]", hasOverflow);
  }, gridParentElement);

  const handleScroll = () => {
    setScrollTop(gridParentElement.current?.scrollTop ?? 0);
    !!props.onScroll && props.onScroll(gridParentElement.current);
  };

  const updateLayout = () => {
    const templateColumns = window.getComputedStyle(ghostGrid.current).getPropertyValue("grid-template-columns");
    setColumnWidth(parseFloat(templateColumns.split("px ")[0]));
    !!ghostGrid.current && setColumnCount(templateColumns.split(" ").length);
  };

  const getVisibleElementsIndices = () => {
    const headerHeight = header.current?.getBoundingClientRect()?.height ?? 0;
    const viewportHeight = gridParentElement.current?.getBoundingClientRect()?.height ?? 0;

    topIndexThreshold.current = ((scrollTop - headerHeight) / (props.rowHeight + props.gapY)) * columnCount - props.buffer * columnCount;
    bottomIndexThreshold.current =
      ((scrollTop - headerHeight + viewportHeight) / (props.rowHeight + props.gapY)) * columnCount + props.buffer * columnCount;
  };

  const getVisibleElements = () => {
    getVisibleElementsIndices();
    const visibleElements = [];

    for (let i = 0; i < props.total; i++) {
      const isInViewport = i > topIndexThreshold.current && i < bottomIndexThreshold.current;
      if (!isInViewport) continue;

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
    <div
      ref={gridParentElement}
      className="flex flex-col overflow-auto grow sm:scrollbar-hide sm:pr-[0px]"
      onScroll={useMemo(() => throttle(handleScroll, 100, { leading: true, trailing: true }), [])}
    >
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
      <div style={{ minHeight: getHeight() || 0 }} className="relative w-full overflow-hidden z-0">
        {getVisibleElements()}
      </div>
      <div ref={footer} className="box-border">
        {props.footer || ""}
      </div>
    </div>
  );
};

export default VirtualizedGrid;
