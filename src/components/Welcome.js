import React from 'react';
import showStripe from 'assets/show_stripe.svg';
import classes from './Welcome.module.scss';

const Welcome = ({ setModal }) => (
  <section className={classes.welcome}>
    <h1 className="title">Welcome!</h1>
    <img src={showStripe} alt="line" className="line" />
    <p className="subtitle">We're building something new here!</p>
    <p className="description">
      Meanwhile know us a little more - follow us in our social media channels.
      <br />
      If you have any doubt, don't be shy, drop us a line!
      <br />
      Be our partner, be our client, be part of the show.
    </p>
    <ul className="social">
      <li className="socialItem">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
        >
          <span className="icon-linkedin2"></span>
        </a>
      </li>
      <li className="socialItem">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
        >
          <span className="icon-behance"></span>
        </a>
      </li>
      <li className="socialItem">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
        >
          <span className="icon-instagram"></span>
        </a>
      </li>
      <li className="socialItem">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
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
    <button className="cta" onClick={() => setModal(true)}>
      Get a quote today!
    </button>
  </section>
);
export default Welcome;
