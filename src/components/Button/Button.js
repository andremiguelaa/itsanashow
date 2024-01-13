import React, { useRef, useEffect, useState } from "react";
import Lottie from "react-lottie-player";

import button from "src/assets/button.json";

import classes from "./Button.module.scss";

const buttonFrameLimits = {
  start: 30,
  middle: 70,
  middle2: 156,
  end: 179,
};

const Button = () => {
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
    <div className={classes.buttonWrapper}>
      <button
        aria-label="Capabilities Deck"
        className={classes.button}
        onMouseEnter={() => {
          numberChange(buttonFrameLimits.start, buttonFrameLimits.middle);
        }}
        onMouseLeave={() => {
          numberChange(buttonFrameLimits.middle2, buttonFrameLimits.end);
        }}
      >
        <Lottie animationData={button} goTo={buttonFrameState} />
      </button>
    </div>
  );
};

export default Button;
