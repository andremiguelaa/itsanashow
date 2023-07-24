import React from "react";
import Link from "next/link";
import Lottie from "react-lottie-player";

import nest from "src/assets/nest.json";
import classes from "src/pages/error.module.scss";

const Error = () => (
  <div className={classes.content}>
    <div>
      <div className={classes.animation}>
        <Lottie animationData={nest} play loop />
      </div>
      <p className={classes.oops}>Oopsie! </p>
      <p className={classes.miss}>Something’s wrong…</p>
      <p className={classes.message}>
        <strong>Please try again later!</strong> Sorry about that.
      </p>
      <Link href="/" className={classes.link}>
        Take me back Home!
      </Link>
    </div>
  </div>
);

export default Error;
