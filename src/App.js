import React, { useState } from 'react';
import Header from 'components/Header';
import Video from 'components/Video';
import Welcome from 'components/Welcome';
import Modal from 'components/Modal';

const App = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Header setModal={setModal} />
      <Video />
      <Welcome setModal={setModal} />
      <Modal modal={modal} setModal={setModal} />
    </>
  );
};

export default App;
