import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie-player';

import nest from 'assets/nest.json';

import classes from './NoMatch.module.scss';

const Error = () => {
  return (
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
};

export default Error;
