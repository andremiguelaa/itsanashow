import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import classNames from "classnames";

import AppContext from "src/AppContext";
import Loading from "src/components/Loading/Loading";
import Cursor from "src/components/Cursor/Cursor";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/index.scss";

import classes from "./app.module.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cursorType, setCursorType] = useState("default");
  const [scrollLocked, setScrollLocked] = useState(true);

  const pageKey = router.asPath;

  const isWorkDetailPage = pageKey.startsWith("/work/");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [pageKey]);

  return (
    <AppContext.Provider
      value={{
        cursorType,
        setCursorType,
        setScrollLocked,
        textAnimationAvailable: !scrollLocked,
      }}
    >
      <div
        className={classNames(classes.wrapper, {
          [classes.scrollLock]: scrollLocked,
        })}
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CK5GL0XLJS" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CK5GL0XLJS');
        `}
        </Script>
        <Loading />
        <Header />
        <div>
          <Component key={pageKey} {...pageProps} />
          <Footer lead={!isWorkDetailPage} />
        </div>
        <Cursor />
      </div>
    </AppContext.Provider>
  );
}
