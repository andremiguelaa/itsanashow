import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import { useInView } from 'react-intersection-observer';

import head from 'assets/head.json';

const headFrameLimits = {
  start: 0,
  // middle1: 32,
  middle: 44,
  end: 61,
};

const Head = ({ className }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const headFrame = useRef(headFrameLimits.middle);
  const headTimer = useRef();
  const [headFrameState, setHeadFrameState] = useState(headFrameLimits.start);

  const numberChange = (start, end) => {
    headFrame.current = start;
    clearInterval(headTimer.current);
    headTimer.current = setInterval(() => {
      const direction = start > end ? -1 : 1;
      if (headFrame.current === end) {
        clearInterval(headTimer.current);
      } else {
        headFrame.current = headFrame.current + direction;
      }
      setHeadFrameState(headFrame.current);
    }, 40);
  };

  useEffect(() => {
    if (inView) {
      numberChange(headFrameLimits.start, headFrameLimits.middle);
    } else {
      headFrame.current = headFrameLimits.start;
      setHeadFrameState(headFrame.current);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => {
        numberChange(headFrameLimits.middle, headFrameLimits.end);
      }}
      onMouseLeave={() => {
        numberChange(headFrameLimits.start, headFrameLimits.middle);
      }}
    >
      <Lottie animationData={head} goTo={headFrameState} />
    </div>
  );
};

export default Head;
