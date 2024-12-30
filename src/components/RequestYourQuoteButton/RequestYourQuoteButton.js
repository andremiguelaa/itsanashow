import React, { useRef, useContext } from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";

import { AppContext } from "src/AppContext";
import CTA01 from "src/assets/buttons/CTA01.json";

import classes from "./RequestYourQuoteButton.module.scss";

const RequestYourQuoteButton = () => {
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
      onClick={() => router.push("/contact-us")}
    >
      <Lottie ref={lottie} animationData={CTA01} loop={false} />
    </button>
  );
};

export default RequestYourQuoteButton;
