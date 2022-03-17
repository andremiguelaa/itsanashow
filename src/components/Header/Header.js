import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import Social from 'components/Social/Social';
import logo from 'assets/logo.svg';
import miniLogo from 'assets/showIcon.svg';
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
        <Link to="/" className={classes.logoWrapper}>
          <img className={classes.logo} src={logo} alt="logo" />
          <img className={classes.miniLogo} src={miniLogo} alt="logo" />
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
              href="https://www.figma.com/file/a3zbwa7FUtsrL1oXhhYy5J/itsanashow_desktop_2022?node-id=0%3A1"
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
