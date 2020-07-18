import React from 'react';

import Video from 'components/Video/Video';
import Welcome from 'components/Welcome/Welcome';

import video from 'assets/video.mp4';
import frame from 'assets/frame.png';

const Home = ({ setModal }) => (
  <>
    <Video video={video} frame={frame} />
    <Welcome setModal={setModal} />
  </>
);

export default Home;
