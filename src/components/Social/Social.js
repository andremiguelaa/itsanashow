import React from 'react';
import classes from './Social.module.scss';

const Social = () => (
  <ul className={classes.social}>
    <li className={classes.socialItem}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.socialIcon}
      >
        <span className="icon-linkedin2"></span>
      </a>
    </li>
    <li className={classes.socialItem}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.socialIcon}
      >
        <span className="icon-behance"></span>
      </a>
    </li>
    <li className={classes.socialItem}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.socialIcon}
      >
        <span className="icon-instagram"></span>
      </a>
    </li>
    <li className={classes.socialItem}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.socialIcon}
      >
        <span className="icon-facebook"></span>
      </a>
    </li>
  </ul>
);
export default Social;
