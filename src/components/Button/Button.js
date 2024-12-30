import React, { useRef, useContext } from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";

import { AppContext } from "src/AppContext";

import arrow01 from "src/assets/buttons/arrow01.json";

import classes from "./Button.module.scss";

const Button = ({ text }) => {
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
      onClick={() => router.push("/work")}
    >
      {text}{" "}
      <div className={classes.arrow}>
        <Lottie ref={lottie} animationData={arrow01} loop={false} />
      </div>
    </button>
  );
};

export default Button;
