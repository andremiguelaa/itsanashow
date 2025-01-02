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
import inIcon from "src/assets/social/IN.svg";
import beIcon from "src/assets/social/Be.svg";
import igIcon from "src/assets/social/IG.svg";
import viIcon from "src/assets/social/VI.svg";
import drIcon from "src/assets/social/DR.svg";

import classes from "./Header.module.scss";

const Header = ({ noDefaultHeader }) => {
  const { setCursorType } = useContext(AppContext);

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
      noDefaultHeader ? false : global.document.scrollingElement.scrollTop < window.innerHeight
    );
  }, [noDefaultHeader]);

  useEffect(() => {
    global.document.addEventListener("scroll", listenToScroll);
    return () => {
      global.document.removeEventListener("scroll", listenToScroll);
    };
  }, [listenToScroll]);

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
                <span className={classes.text}>About us</span>
              </Link>
              <Link
                href="/insights"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
                className={classnames({
                  [classes.active]: page === "/insights",
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
              <div className={classes.requestButton}>
                <RequestYourQuoteButton />
              </div>
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
              about us
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
              href="/insights"
              className={classnames(classes.link, {
                [classes.active]: page === "/insights",
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
            <div className={classes.requestButton}>
              <RequestYourQuoteButton />
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/company/itsanashow-studio"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img src={inIcon.src} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/itsanashow.studio/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src={igIcon.src} alt="Instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/ItsanashowStudio"
                target="_blank"
                rel="noreferrer"
                aria-label="Behance"
              >
                <img src={beIcon.src} alt="Behance" />
              </a>
            </li>
            <li>
              <a
                href="https://vimeo.com/itsanashowstudio"
                target="_blank"
                rel="noreferrer"
                aria-label="Vimeo"
              >
                <img src={viIcon.src} alt="Vimeo" />
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/itsanashow_studio"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribble"
              >
                <img src={drIcon.src} alt="Dribble" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
