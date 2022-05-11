import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import logo from 'assets/logo.gif';
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
              <img className={classes.logo} src={logo} alt="logo" />
            </Link>
            <nav>
              <Link to="/work">Our work</Link>
              <Link to="/us">Know us</Link>
              <button
                onClick={() => {
                  setModal(true);
                  setMenu(false);
                }}
              >
                Contact us
              </button>
            </nav>
          </div>
          {/* 
          <button className={classes.menuButton} onClick={() => setMenu(true)}>
            Menu
            <div />
            <div />
            <div />
          </button>
          */}
        </div>
      </header>
      {/* 
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
        </div>
      </nav>
      */}
    </>
  );
};

export default Header;
