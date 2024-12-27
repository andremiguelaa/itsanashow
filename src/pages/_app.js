import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import classnames from "classnames";

import AppContext from "src/AppContext";
import Cursor from "src/components/Cursor/Cursor";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/index.scss";

import classes from "./app.module.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const ref = useRef();
  const [cursorType, setCursorType] = useState("default");
  const [scrollElement, setScrollElement] = useState(null);

  useEffect(() => {
    setScrollElement(ref.current);
  }, [ref, setScrollElement]);

  const pageKey = router.asPath;

  return (
    <AppContext.Provider
      value={{
        cursorType,
        setCursorType,
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
        <Header noDefaultHeader={router.pathname === "/privacy-policy"} />
        <div
          className={classnames(classes.content)}
          ref={ref}
        >
          <Component key={pageKey} {...pageProps} />
          <Footer />
        </div>
        <Cursor />
      </div>
    </AppContext.Provider>
  );
}
