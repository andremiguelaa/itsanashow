import React from 'react';
import isTouchDevice from 'is-touch-device';

import classes from './Video.module.scss';

const Video = ({ video, frame }) => {
  const isTouch = isTouchDevice();

  return (
    <section className={classes.video}>
      {isTouch || !video ? (
        <img className={classes.poster} src={frame} alt="poster" />
      ) : (
        <video autoPlay loop muted src={video} poster={frame} />
      )}
      <div className={classes.overlay} />
      <div className={classes.text}>
        <p className={classes.lead}>Welcome to itsanashow!</p>
        <p className={classes.slogan}>
          We love to give shape to beautiful and meaningful stories.
        </p>
      </div>
    </section>
  );
};
export default Video;
