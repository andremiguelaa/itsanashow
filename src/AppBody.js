import React, { useState, useRef, useEffect, useContext } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import { AppContext } from 'AppContext';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Modal from 'components/Modal/Modal';
import Home from 'views/Home';
import Us from 'views/Us';
import Work from 'views/Work';
import WorkDetail from 'views/WorkDetail';
import Policy from 'views/Policy';
import Blog from 'views/Blog';
import Article from 'views/Article';
import NoMatch from 'views/NoMatch';

import classes from './AppBody.module.scss';

const transitionDuration = 4000;

const getSentence = ({ pathname, state }) => {
  switch (pathname) {
    case '/':
      return (
        <>
          YEAH, you're back!
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
          <strong>We have your back.</strong>
          <br />
          Trust us! 🤝
        </>
      );
    case '/logbook':
      return (
        <strong>
          Great things begin
          <br />
          with a curious mind.
          <br />
          🧠
        </strong>
      );
    default:
      if (state?.origin === 'work' && pathname.includes('/work/')) {
        return (
          <>
            <strong>Limitless imagination</strong>
            <br />
            is the way to go! 🦄
          </>
        );
      }
      if (state?.origin === 'logbook' && pathname.includes('/logbook/')) {
        return (
          <strong>
            Holding our breath
            <br />
            as the story unfolds...
            <br />
            📖
          </strong>
        );
      }
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
  const { setScrollElement } = useContext(AppContext);
  const location = useLocation();
  const ref = useRef();
  useEffect(() => {
    setScrollElement(ref.current);
  }, [ref, setScrollElement]);
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
          {getSentence(location)}
        </div>
      </div>
      <Header transitionDuration={transitionDuration} />
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={transitionDuration}
          onEntering={(node) => {
            setScrollElement(node);
          }}
          onExit={() => {
            setTransitionPaneVisible(true);
          }}
          onExited={() => {
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
                  <>
                    <Helmet>
                      <title>Itsanashow Studio</title>
                      <meta
                        name="description"
                        content="Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling."
                      />
                    </Helmet>
                    <Home />
                  </>
                </Route>
                <Route exact path="/us">
                  <>
                    <Helmet>
                      <title>Itsanashow Studio | Know Us</title>
                      <meta
                        name="description"
                        content="Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling."
                      />
                    </Helmet>
                    <Us />
                  </>
                </Route>
                <Route exact path="/work">
                  <>
                    <Helmet>
                      <title>Itsanashow Studio | Our Work</title>
                      <meta
                        name="description"
                        content="Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling."
                      />
                    </Helmet>
                    <Work />
                  </>
                </Route>
                <Route exact path="/work/:name">
                  <WorkDetail />
                </Route>
                <Route exact path="/privacy-policy">
                  <>
                    <Helmet>
                      <title>Itsanashow Studio | Privacy Policy</title>
                      <meta
                        name="description"
                        content="Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling."
                      />
                    </Helmet>
                    <Policy />
                  </>
                </Route>
                <Route exact path="/logbook">
                  <>
                    <Helmet>
                      <title>Itsanashow Studio | Logbook</title>
                      <meta
                        name="description"
                        content="Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling."
                      />
                    </Helmet>
                    <Blog />
                  </>
                </Route>
                <Route exact path="/logbook/:slug">
                  <Article />
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
