import React from 'react';
import showStripe from 'assets/showStripe.svg';
import Social from 'components/Social/Social';
import Canvas from './Canvas';
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
    <Social />
    <p className={classes.lead}>
      Let the show begin!
      <br />
      Welcome to itsanashow!
    </p>
    <button className="cta" onClick={() => setModal(true)}>
      Get a quote today!
    </button>
    <Canvas />
  </section>
);
export default Welcome;
