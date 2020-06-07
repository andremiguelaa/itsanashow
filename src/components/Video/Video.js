import React from 'react';
import video from 'assets/video.mp4';
import classes from './Video.module.scss';

const Video = () => (
  <section className={classes.video}>
    <video autoPlay loop muted src={video}></video>
  </section>
);
export default Video;
