import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import classNames from "classnames";

import { AppContext } from "src/AppContext";
import animation from "src/assets/intro-eye.json";

import classes from "./Loading.module.scss";

let interval;
const ANIMATION_FRAMES = 64;
const ANIMATION_DURATION = 5000;
const FPS = 12;
const step_duration = 1000 / FPS;
const total_steps = ANIMATION_DURATION / step_duration;
const frame_interval = ANIMATION_FRAMES / total_steps;

const Loading = () => {
  const router = useRouter();
  const pageKey = router.asPath;

  const [done, setDone] = useState();
  const [currentFrame, setCurrentFrame] = useState(0);
  const { setScrollLocked } = useContext(AppContext);

  useEffect(() => {
    interval = setInterval(() => {
      setCurrentFrame((prev) => prev + frame_interval);
    }, step_duration);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentFrame >= ANIMATION_FRAMES || pageKey !== "/") {
      clearInterval(interval);
      setDone(true);
      setScrollLocked(false);
    }
  }, [currentFrame, setScrollLocked, pageKey]);

  return (
    <div className={classNames(classes.loading, { [classes.done]: done })}>
      <div className={classes.loadingWrapper}>
        <Lottie animationData={animation} goTo={currentFrame} />
      </div>
    </div>
  );
};

export default Loading;
