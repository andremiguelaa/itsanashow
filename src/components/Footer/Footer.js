import React from 'react';

import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={classes.social}>
        <p className={classes.lead}>Don't forget to follow us!</p>
        <ul>
          <li>
            <a href="#" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div className={classes.contacts}>
        <div className={classes.address}>
          Rua Braamcamp 84 3D
          <br />
          1250-052 Lisboa
          <br />
          Portugal
        </div>
        <div className={classes.other}>
          <dl>
            <dt>General Questions</dt>
            <dd>
              <a href="mailto:hello@itsanashow.com">hello@itsanashow.com</a>
            </dd>
            <dt>New business inquiries</dt>
            <dd>
              <a href="#" target="_blank">
                Let's Talk
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
