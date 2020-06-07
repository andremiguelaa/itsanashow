import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import anime from 'animejs';
import video from 'assets/video.mp4';
import frame from 'assets/frame.png';
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

const Video = () => {
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
    <section className={classes.video} style={{ top: `-${videoScroll}px` }}>
      <video autoPlay loop muted src={video} poster={frame}></video>
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
      <div
        className={`${classes.scrollContainer} ${
          videoScroll ? classes.hidden : ''
        }`}
      >
        <div className={classes.scroll}></div>
      </div>
    </section>
  );
};
export default Video;
