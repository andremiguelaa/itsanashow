import React, { useContext } from "react";
import Link from "next/link";

import AppContext from "src/AppContext";
import Button from "src/components/Button/Button";
import DummyHead from "src/components/Head/Head";
import DeckButton from "src/components/DeckButton/DeckButton";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import arrow from "src/assets/buttons/arrowB.json";
import arrowG from "src/assets/buttons/arrowG.json";
import inIcon from "src/assets/social/IN.svg";
import beIcon from "src/assets/social/Be.svg";
import igIcon from "src/assets/social/IG.svg";
import viIcon from "src/assets/social/VI.svg";
import drIcon from "src/assets/social/DR.svg";
import logo from "src/assets/logo_hor.svg";

import classes from "./Footer.module.scss";

const Footer = ({ lead = true }) => {
  const { setCursorType } = useContext(AppContext);
  return (
    <footer className={classes.footer}>
      <div className={classes.intro}>
        {lead && (
          <div className={classes.customWrapper}>
            <p className={classes.sentence}>
              <AnimatedText>
                Together, we can create marvels that drive results and steal the
                show.
              </AnimatedText>
            </p>
          </div>
        )}
        <div className="wrapper">
          <div className={classes.cta}>
            <Button
              text="Let the fun begin!"
              arrow={arrow}
              target="/contacts"
            />
          </div>
        </div>
        <DummyHead className={classes.head} />
      </div>
      <div className="wrapper">
        <div className={classes.columns}>
          <button
            className={classes.top}
            onClick={() => window.scrollTo(0, 0)}
          />
          <div>
            <img src={logo.src} alt="itsanashow creative studio logo" />
            <nav className={classes.nav}>
              <ul>
                <li>
                  <Link
                    href="/work"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/us"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/insights"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={classes.rightColumn}>
            <p className={classes.lead}>Your next big thing starts here.</p>
            <Button
              text={<span className={classes.link}>Let&apos;s chat!</span>}
              arrow={arrowG}
              target="/contacts"
            />
            <div>
              <DeckButton />
            </div>
          </div>
        </div>

        <div className={classes.social}>
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
                href="https://www.behance.net/ItsanashowStudio"
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
        </div>
        <p className={classes.copyright}>
          © Itsanashow Creative Studio, Lda {new Date().getFullYear()}.<br />{" "}
          All rights reserved. |{" "}
          <Link
            href="/privacy-policy"
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
