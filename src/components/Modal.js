import React from 'react';
import showStripe from 'assets/show_stripe.svg';
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
      <h1 className="title">Hello there!</h1>
      <img src={showStripe} alt="line" className="line" />
      <p className="subtitle">Drop us a line</p>
      <p className="description">
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
      </div>
    </section>
  </div>
);
export default Modal;
