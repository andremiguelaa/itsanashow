import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';
import miniLogo from 'assets/showIcon.svg';
import classes from './Header.module.scss';

const Header = ({ setModal }) => (
  <header className={classes.header}>
    <Link to="/">
      <img className={classes.logo} src={logo} alt="logo" />
      <img className={classes.miniLogo} src={miniLogo} alt="logo" />
    </Link>
    <Link to="/us">Us</Link>
    <button className={`cta ${classes.cta}`} onClick={() => setModal(true)}>
      Let's Talk!
    </button>
  </header>
);
export default Header;
