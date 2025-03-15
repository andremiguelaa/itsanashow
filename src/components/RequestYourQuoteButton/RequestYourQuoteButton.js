import React, { useState, useEffect, useRef, useContext } from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";

import { AppContext } from "src/AppContext";
import CTA01 from "src/assets/buttons/CTA01.json";

import classes from "./RequestYourQuoteButton.module.scss";

const buttonFrameLimits = {
  startIn: 0,
  endIn: 32,
  startOut: 64,
  endOut: 95,
};

const RequestYourQuoteButton = () => {
  const router = useRouter();
  const { setCursorType } = useContext(AppContext);

  const buttonFrame = useRef(buttonFrameLimits.startIn);
  const buttonTimer = useRef();
  const [buttonFrameState, setButtonFrameState] = useState(
    buttonFrameLimits.startIn
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
      className={classes.button}
      onMouseEnter={() => {
        numberChange(buttonFrameLimits.startIn, buttonFrameLimits.endIn);
        setCursorType("bigger");
      }}
      onMouseLeave={() => {
        numberChange(buttonFrameLimits.startOut, buttonFrameLimits.endOut);
        setCursorType("default");
      }}
      onClick={() => router.push("/contacts")}
    >
      <Lottie animationData={CTA01} goTo={buttonFrameState} />
    </button>
  );
};

export default RequestYourQuoteButton;
