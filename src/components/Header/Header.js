import React from 'react';
import logo from 'assets/logo.svg';
import classes from './Header.module.scss';

const Header = ({ setModal }) => (
  <header className={classes.header}>
    <img className={classes.logo} src={logo} alt="" />
    <button className={`cta ${classes.cta}`} onClick={() => setModal(true)}>
      Let's Talk!
    </button>
  </header>
);
export default Header;
