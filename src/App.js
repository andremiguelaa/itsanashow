import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Home from 'views/Home';
import Us from 'views/Us';
import Work from 'views/Work';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [modal, setModal] = useState(false);

  return (
    <ParallaxProvider>
      <Router>
        <Header setModal={setModal} />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/us">
              <Us />
            </Route>
            <Route path="/work">
              <Work />
            </Route>
          </Switch>
        </main>
        <Footer />
        <Modal modal={modal} setModal={setModal} />
      </Router>
    </ParallaxProvider>
  );
};

export default App;
