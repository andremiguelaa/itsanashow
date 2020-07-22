import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import logo from 'assets/logo.svg';
import miniLogo from 'assets/showIcon.svg';
import classes from './Header.module.scss';

const Header = ({ setModal }) => {
  const location = useLocation();
  const [page, setPage] = useState();
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    setPage(location.pathname);
    setMobileMenu(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.logoWrapper}>
          <img className={classes.logo} src={logo} alt="logo" />
          <img className={classes.miniLogo} src={miniLogo} alt="logo" />
        </Link>
        <div className={classes.buttons}>
          <button className={classes.menu} onClick={() => setMobileMenu(true)}>
            Menu
          </button>
          <Link
            to="/us"
            className={classnames(classes.us, {
              [classes.active]: page === '/us',
            })}
          >
            Know Us
          </Link>
          <button
            className={classnames('cta', classes.cta, {
              [classes.onUs]: page === '/us',
            })}
            onClick={() => setModal(true)}
          >
            Let's Talk!
          </button>
        </div>
      </header>
      <nav
        className={classnames(classes.mobileMenu, {
          [classes.open]: mobileMenu,
        })}
      >
        <button className={classes.close} onClick={() => setMobileMenu(false)}>
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
          <Link
            to="/"
            className={classnames({
              [classes.active]: page === '/',
            })}
          >
            home
          </Link>
          <Link
            to="/us"
            className={classnames({
              [classes.active]: page === '/us',
            })}
          >
            know us
          </Link>
          <button
            onClick={() => {
              setModal(true);
              setMobileMenu(false);
            }}
          >
            contact us
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
