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
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
    if (pageKey.includes("#")) {
      setTimeout(() => {
        const element = document.getElementById(window.location.hash.slice(1));
        if (element) {
          element.scrollIntoView();
        }
        setCursorType("default");
      }, 1000);
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setCursorType("default");
      }, 100);
    }
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
        <Script id="meta-pixel">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1135837628640648');
          fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1135837628640648&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
