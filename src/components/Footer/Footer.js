import React, { useContext } from "react";
import Link from "next/link";
import classNames from "classnames";

import AppContext from "src/AppContext";
import Button from "src/components/Button/Button";
import DummyHead from "src/components/Head/Head";
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
      <div className={classNames(classes.intro, { [classes.noLead]: !lead })}>
        {lead && (
          <>
            <div className={classes.customWrapper}>
              <p className={classes.sentence}>
                <AnimatedText>
                  Together, we can create marvels that drive results and steal
                  the show.
                </AnimatedText>
              </p>
            </div>
            <div className="wrapper">
              <div className={classes.cta}>
                <Button
                  text="Let the fun begin!"
                  arrow={arrow}
                  target="/contacts"
                />
              </div>
            </div>
          </>
        )}
        <DummyHead className={classes.head} />
      </div>
      <div className="wrapper">
        <div className={classes.topWrapper}>
          <button
            className={classes.top}
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </div>
      <div className="wrapper">
        <div className={classes.columns}>
          <div>
            <img src={logo.src} alt="itsanashow creative studio logo" />
          </div>
          <div>
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
        </div>

        <div className={classes.columns}>
          <div className={classes.newsletterWrapper}>
            <p className={classes.newsletter}>
              <b>Join our newsletter if you’re looking for</b>{" "}
              <s>
                <em>coaching, tips for success, multi level marketing</em>
              </s>
              <b>...good vibes!</b>
            </p>
            <form
              action="https://itsanashow.us7.list-manage.com/subscribe/post?u=cf276ffda6d4a0a4261818720&id=1c5f3005aa&f_id=00c047e4f0"
              method="post"
              target="_blank"
              noValidate
              className={classes.form}
            >
              <input
                type="email"
                name="EMAIL"
                placeholder="Your email"
                required
                className={classes.emailInput}
              />
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_cf276ffda6d4a0a4261818720_1c5f3005aa"
                  tabIndex="-1"
                  value=""
                  readOnly
                />
              </div>
              <input
                type="submit"
                name="subscribe"
                value="I'm in!"
                className={classes.submit}
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              />
            </form>
          </div>
          <div className={classes.rightColumn}>
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
            </div>
            <p className={classes.lead}>Your next big thing starts here.</p>
            <Button
              text={<span className={classes.link}>Let&apos;s chat!</span>}
              arrow={arrowG}
              target="/contacts"
            />
          </div>
        </div>

        <div className={classes.columns}>
          <p className={classes.copyright}>
            © Itsanashow Creative Studio, Lda {new Date().getFullYear()} | All
            rights reserved. <span className={classes.separator}>|</span>{" "}
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
          <button
            className={classes.backToTop}
            onClick={() => window.scrollTo(0, 0)}
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
