import React from 'react';

import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className={classes.social}>
          <p className={classes.lead}>Don't forget to follow us!</p>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/company/itsanashow-studio"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/itsanashow.studio/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/ItsanashowStudio"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
            </li>
            <li>
              <a
                href="https://vimeo.com/itsanashowstudio"
                target="_blank"
                rel="noreferrer"
              >
                Vimeo
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
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:hello@itsanashow.com"
                >
                  hello@itsanashow.com
                </a>
              </dd>
              <dt>New business inquiries</dt>
              <dd>
                <a
                  href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
                  target="_blank"
                  rel="noreferrer"
                >
                  Let's Talk
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
