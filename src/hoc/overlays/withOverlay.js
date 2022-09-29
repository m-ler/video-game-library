import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

const getOverlayPosition = (rect, position) => {
  const positions = {
    "top": `top:${rect.top}px; left:${rect.width / 2 + rect.left}px;`,
    "left": `top:${rect.height / 2 + rect.top}px; left:${rect.left}px;`,
    "bottom": `top:${rect.height + rect.top}px; left:${rect.width / 2 + rect.left}px;`,
    "right": `top:${rect.height / 2 + rect.top}px; left:${rect.width + rect.left}px;`,
    "top-left": `top:${rect.top}px; left:${rect.left}px;`,
    "top-right": `top:${rect.top}px; left:${rect.width + rect.left}px;`,
    "bottom-right": `top:${rect.height + rect.top}px; left:${rect.width + rect.left}px;`,
    "bottom-left": `top:${rect.height + rect.top}px; left:${rect.left}px;`,
  };
  return positions[position] || positions["top"];
};

const getAnchorPosition = (rect, position) => {
  const anchors = {
    "top": `top:0px; left:0px; transform: translateX(-50%);`,
    "left": `top:0px; left:0px; transform: translateY(-50%);`,
    "bottom": `bottom:0px; left:0px; transform: translateX(-50%);`,
    "right": `top:0px; right:0px; transform: translateY(-50%);`,
    "top-left": `top:0px; left:0px;`,
    "top-right": `top:0px; right:0px;`,
    "bottom-right": `bottom:0px; right:0px;`,
    "bottom-left": `bottom:0px; left:0px;`,
  };
  return anchors[position] || anchors["top-left"];
};

/**
 * @param {React.Component} Component Composite react component.
 * @param {Object} config
 * @param {Node} config.elementTarget Element ref where the overlay is going to base its position.
 * @param {string} config.position top, left, bottom, right, top-left, top-right, bottom-right, bottom-left. Default is 'top'
 * @param {string} config.anchor top, left, bottom, right, top-left, top-right, bottom-right, bottom-left. Default is 'top-left'
 */

const withOverlay = (Component, config) => {
  return props => {
    const [overlayPosition, setOverlayPosition] = useState("top: 0px; left: 0px;");
    const [anchorPosition, setAnchorPosition] = useState("top: 0px; left: 0px;");
    const overlayElement = useRef();
    const anchorElement = useRef();
    const targetResizeObserver = useRef();

    const updateOverlayRect = () => {
      const targetRect = config.elementTarget.getBoundingClientRect();
      setOverlayPosition(getOverlayPosition(targetRect, config.position));
      setAnchorPosition(getAnchorPosition(targetRect, config.anchor));
    };

    useEffect(() => {
      targetResizeObserver.current = new ResizeObserver(() => {});

      targetResizeObserver.current.observe(config.elementTarget);
      updateOverlayRect();
      return () => {};
    }, []);

    useEffect(() => {
      overlayElement.current.setAttribute("style", overlayPosition);
      anchorElement.current.setAttribute("style", anchorPosition);
    }, [overlayPosition]);

    return createPortal(
      <div className={`border border-[#fc5203] overflow-visible max-w-[0px] max-h-[0px] absolute z-50`} ref={overlayElement}>
        <div className="border border-[#3467eb] absolute" ref={anchorElement}>
          <Component {...props}></Component>
        </div>
      </div>,
      document.querySelector("#app") || document.body
    );
  };
};

export default withOverlay;
