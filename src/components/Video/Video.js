import React, { useState } from 'react';
import classnames from 'classnames';
import isTouchDevice from 'is-touch-device';

import classes from './Video.module.scss';

const Video = ({ video, frame }) => {
  const [ended, setEnded] = useState(false);
  const isTouch = isTouchDevice();

  return (
    <section className={classes.video}>
      {isTouch || !video ? (
        <img className={classes.poster} src={frame} alt="poster" />
      ) : (
        <>
          <video
            className={classnames({ [classes.ended]: ended })}
            autoPlay
            muted
            src={video}
            onEnded={() => {
              setEnded(true);
            }}
          />
          <img
            className={classnames(classes.poster, classes.end, {
              [classes.ended]: ended,
            })}
            src={frame}
            alt="poster"
          />
        </>
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
