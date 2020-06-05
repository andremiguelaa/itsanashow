import React from 'react';
import logo from './assets/logo.svg';
import video from './assets/video.mp4';

import classes from './App.module.scss';

const App = () => (
  <>
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="" />
      <button className={classes.cta}>Let's Talk!</button>
    </header>
    <section className={classes.video}>
      <video autoPlay loop muted src={video}></video>
      <button className={classes.scroll} tabIndex="-1">
        <svg className={classes.arrows}>
          <path className={classes.a1} d="M0 2 L20 15 L40 2"></path>
          <path className={classes.a2} d="M0 12 L20 25 L40 12"></path>
          <path className={classes.a3} d="M0 22 L20 35 L40 22"></path>
        </svg>
      </button>
    </section>
    <section className={classes.welcome}>
      <h1 className={classes.title}>Welcome!</h1>
      <p className={classes.slogan}>We're building something new here!</p>
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
            href="https://www.linkedin.com/in/anafborges/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-linkedin2"></span>
          </a>
        </li>
        <li className={classes.socialItem}>
          <a
            href="https://www.behance.net/anafborges"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-behance"></span>
          </a>
        </li>
        <li className={classes.socialItem}>
          <a
            href="https://www.instagram.com/itsanashow/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-instagram"></span>
          </a>
        </li>
        <li className={classes.socialItem}>
          <a
            href="https://www.pinterest.pt/anafborges/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-pinterest2"></span>
          </a>
        </li>
      </ul>
      <p className={classes.lead}>
        Let the show begin!
        <br />
        Welcome to itsanashow!
      </p>
      <button className={classes.cta}>Get a quote today!</button>
    </section>
    <section className={classes.modal}>
      <button className={classes.close}></button>
      <h1 className={classes.title}>Hello there!</h1>
      <p className={classes.lead}>Drop us a line</p>
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
      <p className={classes.slogan}>Let's get social!</p>
      <ul className={classes.social}>
        <li className={classes.socialItem}>
          <a
            href="https://www.linkedin.com/in/anafborges/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-linkedin2"></span>
          </a>
        </li>
        <li className={classes.socialItem}>
          <a
            href="https://www.behance.net/anafborges"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-behance"></span>
          </a>
        </li>
        <li className={classes.socialItem}>
          <a
            href="https://www.instagram.com/itsanashow/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-instagram"></span>
          </a>
        </li>
        <li className={classes.socialItem}>
          <a
            href="https://www.pinterest.pt/anafborges/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.socialIcon}
          >
            <span className="icon-pinterest2"></span>
          </a>
        </li>
      </ul>
    </section>
  </>
);

export default App;
