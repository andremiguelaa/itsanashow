import React, { useState, useRef, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Modal from 'components/Modal/Modal';
import ParallaxWrapper from 'components/ParallaxWrapper/ParallaxWrapper';
import Home from 'views/Home';
import Us from 'views/Us';
import Work from 'views/Work';
import WorkDetail from 'views/WorkDetail';

import classes from './AppBody.module.scss';

const AppBody = () => {
  const location = useLocation();
  const ref = useRef();
  const [scrollEl, setScrollElement] = useState(null);
  useEffect(() => {
    setScrollElement(ref.current);
  }, [ref]);

  return (
    <div className={classes.wrapper}>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={1000}
          onExited={() => {
            setScrollElement(ref.current);
          }}
        >
          <div className={classes.content} ref={ref}>
            {scrollEl && <Header scrollContainer={scrollEl} />}
            <main>
              <Switch location={location}>
                <Route exact path="/">
                  <ParallaxWrapper scrollContainer={scrollEl}>
                    <Home />
                  </ParallaxWrapper>
                </Route>
                <Route exact path="/us">
                  <ParallaxWrapper scrollContainer={scrollEl}>
                    {scrollEl && <Us scrollContainer={scrollEl} />}
                  </ParallaxWrapper>
                </Route>
                <Route exact path="/work">
                  <ParallaxWrapper scrollContainer={scrollEl}>
                    <Work />
                  </ParallaxWrapper>
                </Route>
                <Route exact path="/work/:name">
                  <ParallaxWrapper scrollContainer={scrollEl}>
                    <WorkDetail />
                  </ParallaxWrapper>
                </Route>
              </Switch>
            </main>
            <Footer />
            <Modal />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default AppBody;
