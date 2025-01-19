import React, { useState } from "react";
import Lottie from "react-lottie-player";
import classNames from "classnames";

import animation from "src/assets/intro-eye.json";

import classes from "./Loading.module.scss";

const Loading = () => {
  const [done, setDone] = useState(false);
  return (
    <div className={classNames(classes.loading, { [classes.done]: done })}>
      <Lottie
        animationData={animation}
        play
        loop={false}
        onComplete={() => {
          setDone(true);
        }}
      />
    </div>
  );
};

export default Loading;
