import React, { useState } from 'react';

import logo from 'assets/logo.svg';
import showStripe from 'assets/show_stripe.svg';
import Video from 'components/Video';

import classes from 'App.module.scss';

const App = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <header className={classes.header}>
        <img className={classes.logo} src={logo} alt="" />
        <button className={classes.cta} onClick={() => setModal(true)}>
          Let's Talk!
        </button>
      </header>
      <Video />
      <section className={classes.welcome}>
        <h1 className={classes.title}>Welcome!</h1>
        <img src={showStripe} alt="line" className={classes.line} />
        <p className={classes.subtitle}>We're building something new here!</p>
        <p className={classes.description}>
          Meanwhile know us a little more - follow us in our social media
          channels.
          <br />
          If you have any doubt, don't be shy, drop us a line!
          <br />
          Be our partner, be our client, be part of the show.
        </p>
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
        <p className={classes.lead}>
          Let the show begin!
          <br />
          Welcome to itsanashow!
        </p>
        <button className={classes.cta} onClick={() => setModal(true)}>
          Get a quote today!
        </button>
      </section>
      <div
        className={`${classes.modalWrapper} ${modal ? classes.openModal : ''}`}
      >
        <section className={classes.modal}>
          <button className={classes.close} onClick={() => setModal(false)}>
            <div className={classes.in}>
              <div className={classes.closeButtonBlock}></div>
              <div className={classes.closeButtonBlock}></div>
            </div>
            <div className={classes.out}>
              <div className={classes.closeButtonBlock}></div>
              <div className={classes.closeButtonBlock}></div>
            </div>
          </button>
          <h1 className={classes.title}>Hello there!</h1>
          <img src={showStripe} alt="line" className={classes.line} />
          <p className={classes.subtitle}>Drop us a line</p>
          <p className={classes.description}>
            Tell us a bi about yourself or your business.
            <br />
            We will come back to you asap.
          </p>
          <p className={classes.mail}>
            <a
              href="mailto:hello@itsanashow.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hello@itsanashow.com
            </a>
          </p>
          <div className={classes.footer}>
            <p className={classes.slogan}>Let's get social!</p>
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
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
