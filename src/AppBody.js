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
import Policy from 'views/Policy';
import NoMatch from 'views/NoMatch';

import classes from './AppBody.module.scss';

const transitionDuration = 4000;

const getSentence = (pathname) => {
  switch (pathname) {
    case '/':
      return (
        <>
          Hug, you're back!
          <br />
          <strong>
            Once upon a time...
            <br />
            🤓
          </strong>
        </>
      );
    case '/work':
      return (
        <div className={classes.sentenceWrapperWork}>
          Join us onto new, exciting projects.
          <br />
          <strong>
            Together, we can <br />
            make marvels! 🌟
          </strong>
        </div>
      );
    case '/us':
      return (
        <div className={classes.sentenceWrapperUs}>
          <strong>
            Every adventure needs their wizards,
            <br />
            they make the magic go “boom!”
            <br className={classes.hiddenMobile} />
            🔮
          </strong>
        </div>
      );
    case '/privacy-policy':
      return (
        <>
          <strong>We hold your back.</strong>
          <br />
          Trust us! 🤝
        </>
      );
    default:
      return (
        <>
          Are you curious for more?
          <br />
          <strong>Awesome! ✨</strong>
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
            className={classnames(classes.content)}
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
                <Route exact path="/privacy-policy">
                  <ParallaxWrapper scrollContainer={scrollEl}>
                    <Policy />
                  </ParallaxWrapper>
                </Route>
                <Route>
                  <NoMatch />
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
