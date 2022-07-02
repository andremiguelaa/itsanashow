import React from 'react';
import { Link } from 'react-router-dom';

import nest from '../assets/nest.svg';

import classes from './NoMatch.module.scss';

const NoMatch = () => {
  return (
    <div className={classes.content}>
      <div>
        <img src={nest} alt="nest" />
        <p className={classes.oops}>Oopsie! </p>
        <p className={classes.miss}>Something’s missing…</p>
        <p className={classes.message}>
          <strong>You reach the end of the internet!</strong> Joking, we just
          couldn’t find the page you are looking for. Sorry about that.
        </p>
        <Link to="/" className={classes.link}>
          Take me back Home!
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
