import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import AppContext from './AppContext';

import Cursor from 'components/Cursor/Cursor';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Modal from 'components/Modal/Modal';
import Home from 'views/Home';
import Us from 'views/Us';
import Work from 'views/Work';
import WorkDetail from 'views/WorkDetail';

const App = () => {
  const [modal, setModal] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  return (
    <AppContext.Provider
      value={{
        modal,
        setModal,
        cursorType,
        setCursorType,
      }}
    >
      <Cursor />
      <ParallaxProvider>
        <Router>
          <Header />
          <main>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/us">
              <Us />
            </Route>
            <Route exact path="/work">
              <Work />
            </Route>
            <Route exact path="/work/:name">
              <WorkDetail />
            </Route>
          </main>
          <Footer />
          <Modal />
        </Router>
      </ParallaxProvider>
    </AppContext.Provider>
  );
};

export default App;
