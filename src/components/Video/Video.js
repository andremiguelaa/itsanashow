import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import video from 'assets/video.mp4';
import classes from './Video.module.scss';

const Video = () => {
  const [videoScroll, setVideoScroll] = useState(0);
  useScrollPosition(
    ({ currPos }) => setVideoScroll(currPos.y / 4),
    [],
    null,
    true
  );
  return (
    <section className={classes.video} style={{ top: `-${videoScroll}px` }}>
      <video autoPlay loop muted src={video}></video>
    </section>
  );
};
export default Video;
