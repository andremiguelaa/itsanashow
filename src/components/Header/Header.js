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
import logo from "src/assets/logo.json";
import classes from "./Header.module.scss";

const Header = ({ transitionDuration }) => {
  const { setModal, setTextAnimationAvailable, setCursorType, scrollElement } =
    useContext(AppContext);

  const router = useRouter();
  const [page, setPage] = useState();
  const [menu, setMenu] = useState(false);

  const firstLoad = useRef(true);

  useEffect(() => {
    setPage(router.pathname);
    setMenu(false);
    if (!firstLoad.current) {
      setTextAnimationAvailable(false);
      setTimeout(() => {
        setDefaultHeader(true);
        setTextAnimationAvailable(true);
      }, transitionDuration * 0.75);
    } else {
      firstLoad.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, transitionDuration]);

  const [defaultHeader, setDefaultHeader] = useState(true);

  const listenToScroll = useCallback(() => {
    setDefaultHeader(scrollElement.scrollTop < window.innerHeight);
  }, [scrollElement]);

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
                className={classnames({ [classes.active]: page === "/logbook" })}
              >
                <span className={classes.text}>Logbook</span>
              </Link>
              <button
                onClick={() => {
                  setModal(true);
                  setMenu(false);
                }}
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                <span className={classes.text}>Contact us</span>
              </button>
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
              logbook
            </Link>
            <button
              onClick={() => {
                setModal(true);
                setMenu(false);
              }}
            >
              contact us
            </button>
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
