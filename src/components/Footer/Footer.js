import React, { useContext } from "react";
import Link from "next/link";

import AppContext from "src/AppContext";

import classes from "./Footer.module.scss";

const Footer = () => {
  const { setCursorType } = useContext(AppContext);
  return (
    <footer className={classes.footer}>
      <div className="wrapper">
        <div className={classes.social}>
          <p className={classes.lead}>Don&apos;t forget to follow us!</p>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/company/itsanashow-studio"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/itsanashow.studio/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/ItsanashowStudio"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                Behance
              </a>
            </li>
            <li>
              <a
                href="https://vimeo.com/itsanashowstudio"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                Vimeo
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/itsanashow_studio"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                Dribble
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.hr} />
        <div className={classes.contacts}>
          <div className={classes.address}>
            Palácio Rosa, R. Seara Nova 5
            <br />
            1250-002 Lisboa
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
                  className={classes.mail}
                  onMouseEnter={() => {
                    setCursorType("bigger");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
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
                  className={classes.survey}
                  onMouseEnter={() => {
                    setCursorType("bigger");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                >
                  Let&apos;s Talk
                </a>
              </dd>
            </dl>
            <Link
              href="/privacy-policy"
              className={classes.privacy}
              onMouseEnter={() => {
                setCursorType("bigger");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <p className={classes.copyright}>
          © Itsanashow Creative Studio, Lda {new Date().getFullYear()}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
