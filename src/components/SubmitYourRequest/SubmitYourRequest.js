import React, { useState, useEffect, useRef, useContext } from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";

import { AppContext } from "src/AppContext";
import CTA01 from "src/assets/buttons/CTA02-2.json";

import classes from "./SubmitYourRequest.module.scss";

const buttonFrameLimits = {
  startIn: 0,
  endIn: 32,
  startOut: 64,
  endOut: 95,
};

const SubmitYourRequest = ({ disabled }) => {
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
      disabled={disabled}
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

export default SubmitYourRequest;
