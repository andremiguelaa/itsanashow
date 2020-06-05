import React from 'react';
import logo from './logo.svg';

import classes from './App.module.scss';

const App = () => (
  <div className={classes.app}>
    <img src={logo} className={classes.appLogo} alt="logo" />
  </div>
);

export default App;
