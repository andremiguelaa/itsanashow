import React from 'react';

import Video from 'components/Video/Video';
import Welcome from 'components/Welcome/Welcome';

const Home = ({ setModal }) => (
  <>
    <Video />
    <Welcome setModal={setModal} />
  </>
);

export default Home;
