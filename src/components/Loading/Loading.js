import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import classNames from "classnames";

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
  const [done, setDone] = useState();
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    interval = setInterval(() => {
      setCurrentFrame((prev) => prev + frame_interval);
    }, step_duration);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentFrame >= ANIMATION_FRAMES) {
      clearInterval(interval);
      setDone(true);
    }
  }, [currentFrame]);

  return (
    <div className={classNames(classes.loading, { [classes.done]: done })}>
      <div className={classes.loadingWrapper}>
        <Lottie animationData={animation} goTo={currentFrame} />
      </div>
    </div>
  );
};

export default Loading;
