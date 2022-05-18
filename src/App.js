import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Modal from 'components/Modal/Modal';

import Main from './Main';

const App = () => {
  const [modal, setModal] = useState(false);
  return (
    <ParallaxProvider>
      <Router>
        <Header setModal={setModal} />
        <Main />
        <Footer />
        <Modal modal={modal} setModal={setModal} />
      </Router>
    </ParallaxProvider>
  );
};

export default App;
