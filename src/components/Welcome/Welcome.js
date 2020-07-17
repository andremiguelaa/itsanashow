import React from 'react';
import showStripe from 'assets/showStripe.svg';
import Social from 'components/Social/Social';
import Canvas from './Canvas';
import classes from './Welcome.module.scss';

const Welcome = ({ setModal }) => (
  <section className={classes.welcome}>
    <div className={classes.wrapper}>
      <h1 className="title">Welcome!</h1>
      <img src={showStripe} alt="line" className="line" />
      <p className="subtitle">We're building something new here!</p>
      <p className="description">
        In the meantime, get to know us a bit better and follow us in social media.
        <br />
        If you have any doubt, don't be shy, drop us a line!
        <br />
        <strong>Be our partner, be our client, be part of the show.</strong>
      </p>
      <Social />
      <p className={classes.lead}>
        Welcome to itsanashow!
        <br />
        Let the fun begin!
      </p>
      <button className="cta" onClick={() => setModal(true)}>
        Get a quote today!
      </button>
    </div>
    <Canvas />
  </section>
);
export default Welcome;
