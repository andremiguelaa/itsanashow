import React, { useRef, useContext } from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";

import { AppContext } from "src/AppContext";
import arrow01 from "src/assets/buttons/arrow01.json";

import classes from "./Button.module.scss";

const Button = ({
  text,
  arrow = arrow01,
  target = "/work",
  onClick = undefined,
  reverted = false,
}) => {
  const router = useRouter();
  const lottie = useRef();
  const { setCursorType } = useContext(AppContext);
  return (
    <button
      className={classes.button}
      onMouseEnter={() => {
        setCursorType("bigger");
        lottie.current.goToAndPlay(0);
      }}
      onMouseLeave={() => {
        setCursorType("default");
      }}
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
        router.push(target);
      }}
    >
      {reverted && (
        <div className={classes.arrowReverted}>
          <Lottie ref={lottie} animationData={arrow} loop={false} />
        </div>
      )}
      {text}
      {!reverted && (
        <div className={classes.arrow}>
          <Lottie ref={lottie} animationData={arrow} loop={false} />
        </div>
      )}
    </button>
  );
};

export default Button;
