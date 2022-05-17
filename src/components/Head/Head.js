import React, { useRef, useState } from 'react';
import Lottie from 'react-lottie-player';

import head from 'assets/head.json';

const headFrameLimits = {
  start: 44,
  end: 61,
};

const Head = ({ className }) => {
  const headFrame = useRef(headFrameLimits.start);
  const headTimer = useRef();
  const [headFrameState, setHeadFrameState] = useState(headFrameLimits.start);

  const numberChange = (direction) => {
    clearInterval(headTimer.current);
    headTimer.current = setInterval(() => {
      if (direction === '+') {
        if (headFrame.current === headFrameLimits.end) {
          clearInterval(headTimer.current);
        } else {
          headFrame.current = headFrame.current + 1;
        }
      } else {
        if (headFrame.current === headFrameLimits.start) {
          clearInterval(headTimer.current);
        } else {
          headFrame.current = headFrame.current - 1;
        }
      }
      setHeadFrameState(headFrame.current);
    }, 40);
  };

  return (
    <div
      className={className}
      onMouseEnter={() => {
        numberChange('+');
      }}
      onMouseLeave={() => {
        numberChange('-');
      }}
    >
      <Lottie animationData={head} goTo={headFrameState} />
    </div>
  );
};

export default Head;
