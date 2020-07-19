import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import anime from 'animejs';
import classnames from 'classnames';
import isTouchDevice from 'is-touch-device';

import classes from './Video.module.scss';

const startAnimation = (selector) =>
  anime({
    targets: selector,
    opacity: 1,
    scale: 1,
    easing: 'easeInBounce',
    delay: (_, index) => index * 80,
    direction: 'alternate',
    loop: true,
  });

const Video = ({ video, frame, soon = true, scroll = true, className }) => {
  const isTouch = isTouchDevice();
  const [videoScroll, setVideoScroll] = useState(0);
  useScrollPosition(
    ({ currPos }) => setVideoScroll(currPos.y / 3),
    [],
    null,
    true
  );
  useEffect(() => {
    startAnimation(`.${classes.letter}`);
  }, []);

  return (
    <section
      className={classnames(classes.video, className)}
      style={{ transform: `translateY(-${videoScroll}px` }}
    >
      {isTouch || !video ? (
        <img className={classes.poster} src={frame} alt="poster" />
      ) : (
        <video autoPlay loop muted src={video} poster={frame}></video>
      )}
      {soon && (
        <>
          <div className={classes.soon}>
            {'Coming soon'.split('').map((letter, index) => (
              <div key={`${letter}-${index}`} className={classes.letter}>
                {letter !== ' ' ? letter : <>&nbsp;</>}
              </div>
            ))}
          </div>
          <link
            href="https://fonts.googleapis.com/css?family=Unica+One"
            rel="stylesheet"
          ></link>
        </>
      )}
      {scroll && (
        <div
          className={`${classes.scrollContainer} ${
            videoScroll ? classes.hidden : ''
          }`}
        >
          <div className={classes.scroll}></div>
        </div>
      )}
    </section>
  );
};
export default Video;
