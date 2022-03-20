import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import Social from 'components/Social/Social';
import logo from 'assets/logo.svg';
import classes from './Header.module.scss';

const Header = ({ setModal }) => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    setPage(location.pathname);
    setMenu(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <>
      <header className={classes.header}>
        <Link
          to="/"
          className={classnames(classes.logoWrapper, {
            [classes.loaded]: loaded,
          })}
        >
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>
        <button className={classes.menuButton} onClick={() => setMenu(true)}>
          Menu
        </button>
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
          </div>
          <div>
            <button
              onClick={() => {
                setModal(true);
                setMenu(false);
              }}
            >
              contact us
            </button>
          </div>
          <div>
            <a
              className={classnames('cta', classes.cta)}
              href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
              target="_blank"
              rel="noreferrer"
            >
              Request a quote
            </a>
          </div>
          <div className={classes.social}>
            <p className={classes.slogan}>Let's get social!</p>
            <Social />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
