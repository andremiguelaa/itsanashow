import React, { useRef, useEffect, useState, useContext } from "react";
import classnames from "classnames";
import Lottie from "react-lottie-player";

import { AppContext } from "src/AppContext";

import button from "src/assets/buttons/menu-close.json";

import classes from "./MenuButton.module.scss";

const buttonFrameLimits = {
  start: 0,
  middle: 20,
  middle2: 28,
  end: 42,
};

const MenuButton = ({ defaultHeader, page, menu, setMenu }) => {
  const { setCursorType } = useContext(AppContext);
  const buttonFrame = useRef(buttonFrameLimits.start);
  const buttonTimer = useRef();
  const [buttonFrameState, setButtonFrameState] = useState(
    buttonFrameLimits.start
  );

  const numberChange = (start, end) => {
    buttonFrame.current = start;
    clearInterval(buttonTimer.current);
    buttonTimer.current = setInterval(() => {
      const direction = start > end ? -1 : 1;
      if (buttonFrame.current === end) {
        clearInterval(buttonTimer.current);
      } else {
        buttonFrame.current = buttonFrame.current + direction;
      }
      setButtonFrameState(buttonFrame.current);
    }, 20);
  };

  useEffect(
    () => () => {
      clearInterval(buttonTimer.current);
    },
    []
  );

  return (
    <button
      className={classnames(classes.menuButton, classes[page?.split("/")[1]], {
        [classes.defaultHeader]: defaultHeader,
      })}
      onClick={() => {
        setMenu((prev) => !prev);
        if (!menu) {
          numberChange(buttonFrameLimits.start, buttonFrameLimits.middle);
        } else {
          numberChange(buttonFrameLimits.middle2, buttonFrameLimits.end);
        }
      }}
      onMouseEnter={() => {
        setCursorType("bigger");
      }}
      onMouseLeave={() => {
        setCursorType("default");
      }}
    >
      <div className={classes.button}>
        <Lottie animationData={button} goTo={buttonFrameState} />
      </div>
    </button>
  );
};

export default MenuButton;
