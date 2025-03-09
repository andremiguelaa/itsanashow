import React, { useContext } from "react";

import AppContext from "src/AppContext";

import inIcon from "src/assets/social/IN.svg";
import beIcon from "src/assets/social/Be.svg";
import igIcon from "src/assets/social/IG.svg";
import viIcon from "src/assets/social/VI.svg";
import drIcon from "src/assets/social/DR.svg";

import classes from "./styles.module.scss";

const Contacts = () => {
  const { setCursorType } = useContext(AppContext);

  return (
    <div className={classes.social}>
      <p className={classes.socialLead}>Follow us:</p>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/company/itsanashow-studio"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            <img src={inIcon.src} alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/itsanashow.studio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            <img src={igIcon.src} alt="Instagram" />
          </a>
        </li>
        <li>
          <a
            href="https://www.behance.net/itsanashow-studio"
            target="_blank"
            rel="noreferrer"
            aria-label="Behance"
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            <img src={beIcon.src} alt="Behance" />
          </a>
        </li>
        <li>
          <a
            href="https://vimeo.com/itsanashowstudio"
            target="_blank"
            rel="noreferrer"
            aria-label="Vimeo"
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            <img src={viIcon.src} alt="Vimeo" />
          </a>
        </li>
        <li>
          <a
            href="https://dribbble.com/itsanashow_studio"
            target="_blank"
            rel="noreferrer"
            aria-label="Dribble"
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            <img src={drIcon.src} alt="Dribble" />
          </a>
        </li>
      </ul>
      <p className={classes.socialLead}>Reach out to us:</p>
      <p className={classes.address}>
        <a
          href="mailto:hello@itsanashow.com"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => {
            setCursorType("bigger");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        >
          hello@itsanashow.com
        </a>
        <br />
        <a
          href="https://maps.app.goo.gl/SpUB2Gny8NLuPaRa6"
          className={classes.addressLink}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => {
            setCursorType("bigger");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        >
          Palácio Rosa, R. Seara Nova 5
          <br />
          1250-002 Lisboa
        </a>
      </p>
    </div>
  );
};

export default Contacts;
