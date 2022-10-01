import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

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

const getAnchorPosition = (position, margin) => {
  const anchors = {
    "top": `top:${margin.y || 0}px; left:${margin.x || 0}px; transform: translateX(-50%);`,
    "left": `top:${margin.y || 0}px; left:${margin.x || 0}px; transform: translateY(-50%);`,
    "bottom": `bottom:${margin.y || 0}px; left:${margin.x || 0}px; transform: translateX(-50%);`,
    "right": `top:${margin.y || 0}px; right:${margin.x || 0}px; transform: translateY(-50%);`,
    "top-left": `top:${margin.y || 0}px; left:${margin.x || 0}px;`,
    "top-right": `top:${margin.y || 0}px; right:${margin.x || 0}px;`,
    "bottom-right": `bottom:${margin.y || 0}px; right:${margin.x || 0}px;`,
    "bottom-left": `bottom:${margin.y || 0}px; left:${margin.x || 0}px;`,
  };
  return anchors[position] || anchors["top-left"];
};

/**
 * @param {React.Component} Component Composite react component.
 * @param {boolean} show Shows or hides the overlay.
 * @param {Object} config
 * @param {Node} config.elementTarget Element ref where the overlay is going to base its position.
 * @param {string} config.position top, left, bottom, right, top-left, top-right, bottom-right, bottom-left. Default is 'top'.
 * @param {string} config.anchor top, left, bottom, right, top-left, top-right, bottom-right, bottom-left. Default is 'top-left'.
 * @param {Object} config.margin The distance that separates the overlay with its target element.
 * @param {number} config.margin.x Horizontal margin in pixels.
 * @param {number} config.margin.y Vertical margin in pixel.
 * @param {boolean} config.sameWidth Sets the overlay's width the same as its target element. Default is false.
 * @param {boolean} config.sameHeight Sets the overlay's height the same as its target element. Default is false.
 * @param {boolean} config.autoClose Specify whether the overlay must close when user clicks outside of the overlay. Default is false.
 */

const withOverlay = (Component, config) => {
  if (!config.elementTarget) return () => {};

  return props => {
    const [overlayPosition, setOverlayPosition] = useState("display: none;");
    const [anchorPosition, setAnchorPosition] = useState("top: 0px; left: 0px;");
    const overlayElement = useRef();
    const anchorElement = useRef();
    const targetResizeObserver = useRef();

    const updateOverlayRect = () => {
      const targetRect = config.elementTarget.getBoundingClientRect();
      setOverlayPosition(getOverlayPosition(targetRect, config.position));
      setAnchorPosition(getAnchorPosition(config.anchor, config.margin));
      config.sameWidth && !!anchorElement.current && (anchorElement.current.style.width = `${targetRect.width}px`);
      config.sameHeight && !!anchorElement.current && (anchorElement.current.style.height = `${targetRect.height}px`);
    };

    const onDocumentClick = e => {
      const clickedOutside = props.show && !overlayElement.current.contains(e.target) && !config.elementTarget.contains(e.target);
      clickedOutside && props.setShow(false);
    };

    useEffect(() => {
      targetResizeObserver.current = new ResizeObserver(() => {
        updateOverlayRect();
      });

      targetResizeObserver.current.observe(config.elementTarget);
      updateOverlayRect();

      document.addEventListener("click", onDocumentClick);
      return () => {
        targetResizeObserver.current.disconnect();
        document.removeEventListener("click", onDocumentClick);
      };
    }, []);

    useEffect(() => {
      overlayElement.current.setAttribute("style", overlayPosition);
      anchorElement.current.setAttribute("style", anchorPosition);
      updateOverlayRect();
    }, [overlayPosition]);

    return createPortal(
      <div className={`overflow-visible max-w-[0px] max-h-[0px] absolute z-50`} ref={overlayElement}>
        <div className="absolute" ref={anchorElement}>
          {props.show && <Component {...props}></Component>}
        </div>
      </div>,
      document.querySelector("#app") || document.body
    );
  };
};

export default withOverlay;

withOverlay.PropTypes = {
  show: PropTypes.bool,
};
