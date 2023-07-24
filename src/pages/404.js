import React from "react";
import Link from "next/link";
import Lottie from "react-lottie-player";

import nest from "src/assets/nest.json";
import classes from "./error.module.scss";

const Error = () => (
  <div className={classes.content}>
    <div>
      <div className={classes.animation}>
        <Lottie animationData={nest} play loop />
      </div>
      <p className={classes.oops}>Oopsie! </p>
      <p className={classes.miss}>Something’s missing…</p>
      <p className={classes.message}>
        <strong>You reach the end of the internet!</strong> Joking, we just
        couldn’t find the page you are looking for. Sorry about that.
      </p>
      <Link href="/" className={classes.link}>
        Take me back Home!
      </Link>
    </div>
  </div>
);

export default Error;
