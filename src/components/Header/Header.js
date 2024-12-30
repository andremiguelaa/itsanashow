import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import Lottie from "react-lottie-player";

import { AppContext } from "src/AppContext";
import RequestYourQuoteButton from "src/components/RequestYourQuoteButton/RequestYourQuoteButton";
import logo from "src/assets/logo.json";
import classes from "./Header.module.scss";

const Header = ({ noDefaultHeader }) => {
  const { setCursorType, scrollElement } = useContext(AppContext);

  const router = useRouter();
  const [page, setPage] = useState();
  const [menu, setMenu] = useState(false);

  const firstLoad = useRef(true);

  useEffect(() => {
    setPage(router.pathname);
    setMenu(false);
    if (!firstLoad.current) {
      setDefaultHeader(noDefaultHeader ? false : true);
    } else {
      firstLoad.current = false;
    }
  }, [router.pathname, noDefaultHeader]);

  const [defaultHeader, setDefaultHeader] = useState(
    noDefaultHeader ? false : true
  );

  const listenToScroll = useCallback(() => {
    setDefaultHeader(
      noDefaultHeader ? false : scrollElement.scrollTop < window.innerHeight
    );
  }, [scrollElement, noDefaultHeader]);

  useEffect(() => {
    if (scrollElement) {
      scrollElement.addEventListener("scroll", listenToScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", listenToScroll);
      }
    };
  }, [scrollElement, listenToScroll]);

  return (
    <>
      <header
        className={classnames(
          classes.header,
          classes[page?.split("/")[1]],
          page?.split("/")[2] ? classes.single : undefined,
          {
            [classes.defaultHeader]: defaultHeader,
          }
        )}
      >
        <div className="wrapper">
          <div className={classes.content}>
            <Link
              href="/"
              onMouseEnter={() => {
                setCursorType("bigger");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
            >
              <div className={classes.logo}>
                <Lottie loop animationData={logo} play />
              </div>
            </Link>
            <nav>
              <Link
                href="/work"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
                className={classnames({ [classes.active]: page === "/work" })}
              >
                <span className={classes.text}>Our work</span>
              </Link>
              <Link
                href="/us"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
                className={classnames({ [classes.active]: page === "/us" })}
              >
                <span className={classes.text}>Know us</span>
              </Link>
              <Link
                href="/logbook"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
                className={classnames({
                  [classes.active]: page === "/logbook",
                })}
              >
                <span className={classes.text}>Insights</span>
              </Link>
              <Link
                href="/contact-us"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
                className={classnames({
                  [classes.active]: page === "/contact-us",
                })}
              >
                <span className={classes.text}>Contact us</span>
              </Link>
              <RequestYourQuoteButton />
            </nav>
          </div>
          <button className={classes.menuButton} onClick={() => setMenu(true)}>
            Menu
            <div />
            <div />
            <div />
          </button>
        </div>
      </header>
      <nav
        className={classnames(classes.menu, {
          [classes.open]: menu,
        })}
      >
        <button className={classes.close} onClick={() => setMenu(false)}>
          <div className={classes.in}>
            <div className={classes.closeButtonBlock}></div>
            <div className={classes.closeButtonBlock}></div>
          </div>
          <div className={classes.out}>
            <div className={classes.closeButtonBlock}></div>
            <div className={classes.closeButtonBlock}></div>
          </div>
        </button>
        <div className={classes.links}>
          <div>
            <Link
              href="/"
              className={classnames(classes.link, {
                [classes.active]: page === "/",
              })}
            >
              home
            </Link>
          </div>
          <div>
            <Link
              href="/us"
              className={classnames(classes.link, {
                [classes.active]: page === "/us",
              })}
            >
              know us
            </Link>
            <Link
              href="/work"
              className={classnames(classes.link, {
                [classes.active]: page === "/work",
              })}
            >
              our work
            </Link>
            <Link
              href="/logbook"
              className={classnames(classes.link, {
                [classes.active]: page === "/logbook",
              })}
            >
              insights
            </Link>
            <Link
              href="/contact-us"
              className={classnames(classes.link, {
                [classes.active]: page === "/contact-us",
              })}
            >
              contact us
            </Link>
          </div>
        </div>
        <div className={classes.footer}>
          <p className={classes.slogan}>Let&apos;s get social!</p>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/company/itsanashow-studio"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/itsanashow.studio/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/ItsanashowStudio"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
            </li>
            <li>
              <a
                href="https://vimeo.com/itsanashowstudio"
                target="_blank"
                rel="noreferrer"
              >
                Vimeo
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/itsanashow_studio"
                target="_blank"
                rel="noreferrer"
              >
                Dribble
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
