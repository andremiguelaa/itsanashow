import React from 'react';

import Social from 'components/Social/Social';
import showStripe from 'assets/showStripe.svg';
import contacts from 'assets/contacts.gif';
import contactsVideo from 'assets/contacts.mp4';

import classes from './Modal.module.scss';

const Modal = ({ modal, setModal }) => (
  <div className={`${classes.modalWrapper} ${modal ? classes.openModal : ''}`}>
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
      <div className={classes.gif}>
        <video src={contactsVideo} poster={contacts} autoPlay loop muted />
      </div>
      <div className={classes.content}>
        <h1 className="title">Hello there!</h1>
        <img src={showStripe} alt="line" className="line" />
        <p className="subtitle">Drop us a line</p>
        <p className="description">
          Tell us a bit about yourself or your business.
          <br />
          We will get back to you.
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
        <p>
          <a
            className="cta"
            href="https://www.figma.com/file/a3zbwa7FUtsrL1oXhhYy5J/itsanashow_desktop_2022?node-id=0%3A1"
            target="_blank"
            rel="noreferrer"
          >
            Request a quote
          </a>
        </p>
        <div className={classes.footer}>
          <p className={classes.slogan}>Let's get social!</p>
          <Social />
        </div>
      </div>
    </section>
  </div>
);
export default Modal;
