import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import isTouchDevice from 'is-touch-device';

import bubbleTrail from 'utils/bubbleTrail';
import Header from 'components/Header/Header';
import Home from 'views/Home';
import Us from 'views/Us';
import Modal from 'components/Modal/Modal';

const App = () => {
  const isTouch = isTouchDevice();
  const bubbleContainer = useRef();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (bubbleContainer.current && !isTouch) {
      bubbleTrail.mouseEffects.mouseTrail(bubbleContainer.current);
    }
    const node = bubbleContainer.current;
    return () => {
      bubbleTrail.mouseEffects.killTrail(node);
    };
  }, [isTouch, bubbleContainer]);

  return (
    <div ref={bubbleContainer}>
      <ParallaxProvider>
        <Router>
          <Header setModal={setModal} />
          <Switch>
            <Route exact path="/">
              <Home setModal={setModal} />
            </Route>
            <Route exact path="/us">
              <Us setModal={setModal} />
            </Route>
          </Switch>
          <Modal modal={modal} setModal={setModal} />
        </Router>
      </ParallaxProvider>
    </div>
  );
};

export default App;
