import React from 'react';
import classnames from 'classnames';

import classes from './Social.module.scss';

const Social = ({ inverted, className, itemClassName }) => (
  <ul className={classnames(classes.social, className)}>
    <li className={classnames(classes.socialItem, itemClassName)}>
      <a
        href="https://www.linkedin.com/company/itsanashow-studio"
        target="_blank"
        rel="noopener noreferrer"
        className={classnames(classes.socialIcon, {
          [classes.inverted]: inverted,
        })}
      >
        <span className="icon-linkedin2"></span>
      </a>
    </li>
    <li className={classnames(classes.socialItem, itemClassName)}>
      <a
        href="https://www.behance.net/ItsanashowStudio"
        target="_blank"
        rel="noopener noreferrer"
        className={classnames(classes.socialIcon, {
          [classes.inverted]: inverted,
        })}
      >
        <span className="icon-behance"></span>
      </a>
    </li>
    <li className={classnames(classes.socialItem, itemClassName)}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classnames(classes.socialIcon, {
          [classes.inverted]: inverted,
        })}
      >
        <span className="icon-instagram"></span>
      </a>
    </li>
    <li className={classnames(classes.socialItem, itemClassName)}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={classnames(classes.socialIcon, {
          [classes.inverted]: inverted,
        })}
      >
        <span className="icon-facebook"></span>
      </a>
    </li>
  </ul>
);

export default Social;
