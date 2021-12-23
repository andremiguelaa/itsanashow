import React, { useState, useRef, useEffect } from 'react';

import frame from 'assets/xmas.png';
import video from 'assets/xmas.mp4';

import classes from './VideoModal.module.scss';

const VideoModal = () => {
  const videoRef = useRef();
  const [videoModal, setVideoModal] = useState(true);

  useEffect(() => {
    videoRef.current.addEventListener(
      'ended',
      () => {
        setVideoModal(false);
      },
      false
    );
  }, [videoRef.current]);

  return (
    <div
      className={`${classes.modalWrapper} ${
        videoModal ? classes.openModal : ''
      }`}
    >
      <section className={classes.modal}>
        <video
          ref={videoRef}
          className={classes.video}
          src={video}
          controls
          webkit-playsinline
          playsinline
          poster={frame}
        ></video>
        <button
          className={classes.close}
          onClick={() => {
            setVideoModal(false);
            videoRef.current.pause();
          }}
        >
          <div className={classes.in}>
            <div className={classes.closeButtonBlock}></div>
            <div className={classes.closeButtonBlock}></div>
          </div>
          <div className={classes.out}>
            <div className={classes.closeButtonBlock}></div>
            <div className={classes.closeButtonBlock}></div>
          </div>
        </button>
      </section>
    </div>
  );
};

export default VideoModal;
