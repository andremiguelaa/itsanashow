import React, { useState, useRef, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Modal from 'components/Modal/Modal';
import ParallaxWrapper from 'components/ParallaxWrapper/ParallaxWrapper';
import Home from 'views/Home';
import Us from 'views/Us';
import Work from 'views/Work';
import WorkDetail from 'views/WorkDetail';

import classes from './AppBody.module.scss';

const transitionDuration = 4000;

const getSentence = (pathname) => {
  switch (pathname) {
    case '/':
      return (
        <>
          We're on our way home
          <br />
          We're going home
        </>
      );
    case '/work':
      return (
        <>
          It's been a hard day's night
          <br />
          And I've been workin' like a dog
        </>
      );
    case '/us':
      return (
        <>
          Sail the ship
          <br />
          Chop the tree
          <br />
          Skip the rope
          <br />
          Look at me
          <br />
          All together now
        </>
      );
    default:
      return (
        <>
          You gave me the word, I finally heard
          <br />
          I'm doing the best that I can
          <br />
          I've got to admit it's getting better{' '}
        </>
      );
  }
};

const AppBody = () => {
  const location = useLocation();
  const ref = useRef();
  const [scrollEl, setScrollElement] = useState(null);
  useEffect(() => {
    setScrollElement(ref.current);
  }, [ref]);
  const [transitionPaneVisible, setTransitionPaneVisible] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div
        className={classnames(classes.transitionPane, {
          [classes.visible]: transitionPaneVisible,
        })}
      >
        <div
          className={classes.transitionPaneFirst}
          style={{ animationDuration: `${parseInt(transitionDuration)}ms` }}
        />
        <div
          className={classes.transitionPaneLast}
          style={{
            animationDuration: `${parseInt(transitionDuration)}ms`,
            animationDelay: `${parseInt(transitionDuration / 30)}ms`,
          }}
        />
        <div
          className={classes.transitionPaneMaster}
          style={{ animationDuration: `${parseInt(transitionDuration)}ms` }}
        />
        <div
          className={classes.transitionPaneSentence}
          style={{ animationDuration: `${parseInt(transitionDuration)}ms` }}
        >
          {getSentence(location.pathname)}
        </div>
      </div>
      {scrollEl && (
        <Header
          scrollContainer={scrollEl}
          transitionDuration={transitionDuration}
        />
      )}
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={transitionDuration}
          onExit={() => {
            setTransitionPaneVisible(true);
          }}
          onExited={() => {
            setScrollElement(ref.current);
            setTransitionPaneVisible(false);
          }}
        >
          <div
            className={classes.content}
            ref={ref}
            style={{ animationDuration: `${transitionDuration}ms` }}
          >
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
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Modal />
    </div>
  );
};

export default AppBody;
