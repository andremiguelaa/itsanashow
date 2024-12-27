import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import classnames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useNextCssRemovalPrevention } from "@madeinhaus/nextjs-page-transition";

import AppContext from "src/AppContext";
import Cursor from "src/components/Cursor/Cursor";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/index.scss";

import classes from "./app.module.scss";

const transitionDuration = 4000;

const getSentence = ({ pathname, state }) => {
  switch (pathname) {
    case "/":
      return (
        <>
          YEAH, you&apos;re back!
          <br />
          <strong>
            Once upon a time...
            <br />
            🤓
          </strong>
        </>
      );
    case "/work":
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
    case "/us":
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
    case "/privacy-policy":
      return (
        <>
          <strong>We have your back.</strong>
          <br />
          Trust us! 🤝
        </>
      );
    case "/logbook":
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
      if (state?.prev === "/work" && pathname.includes("/work/")) {
        return (
          <>
            <strong>Limitless imagination</strong>
            <br />
            is the way to go! 🦄
          </>
        );
      }
      if (state?.prev === "/logbook" && pathname.includes("/logbook/")) {
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

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const ref = useRef();
  const [transitionPaneVisible, setTransitionPaneVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  const [textAnimationAvailable, setTextAnimationAvailable] = useState(true);
  const [scrollElement, setScrollElement] = useState(null);
  const [pathHistory, setPathHistory] = useState();
  useNextCssRemovalPrevention();

  useEffect(() => {
    setPathHistory((prev) => ({
      prev: prev?.current,
      current: router.asPath,
    }));
  }, [router.asPath]);

  useEffect(() => {
    setScrollElement(ref.current);
  }, [ref, setScrollElement]);

  const pageKey = router.asPath;

  return (
    <AppContext.Provider
      value={{
        cursorType,
        setCursorType,
        textAnimationAvailable,
        setTextAnimationAvailable,
        scrollElement,
        setScrollElement,
      }}
    >
      <div className={classes.wrapper}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CK5GL0XLJS" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CK5GL0XLJS');
        `}
        </Script>
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
            {getSentence({ pathname: router.pathname, state: pathHistory })}
          </div>
        </div>
        <Header
          transitionDuration={transitionDuration}
          noDefaultHeader={router.pathname === "/privacy-policy"}
        />
        <TransitionGroup>
          <CSSTransition
            key={pageKey}
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
              <Component key={pageKey} {...pageProps} />
              <Footer />
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Cursor />
      </div>
    </AppContext.Provider>
  );
}
