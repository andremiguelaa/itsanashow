import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Lottie from 'react-lottie-player';

import logo from 'assets/logo.json';
import classes from './Header.module.scss';

const Header = ({ setModal }) => {
  const location = useLocation();
  const [page, setPage] = useState();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    setPage(location.pathname);
    setMenu(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <header className={classes.header}>
        <div className="wrapper">
          <div className={classes.content}>
            <Link to="/">
              <div className={classes.logo}>
                <Lottie loop animationData={logo} play />
              </div>
            </Link>
            <nav>
              <Link to="/work">
                <span className={classes.text}>Our work</span>
              </Link>
              <Link to="/us">
                <span className={classes.text}>Know us</span>
              </Link>
              <button
                onClick={() => {
                  setModal(true);
                  setMenu(false);
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
              to="/"
              className={classnames(classes.link, {
                [classes.active]: page === '/',
              })}
            >
              home
            </Link>
          </div>
          <div>
            <Link
              to="/us"
              className={classnames(classes.link, {
                [classes.active]: page === '/us',
              })}
            >
              know us
            </Link>
            <Link
              to="/work"
              className={classnames(classes.link, {
                [classes.active]: page === '/work',
              })}
            >
              our work
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
          <p className={classes.slogan}>Let's get social!</p>
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
          </ul>
        </div>
        <div className={classnames(classes.ball, classes.ball1)} />
        <div className={classnames(classes.ball, classes.ball2)} />
      </nav>
    </>
  );
};

export default Header;
