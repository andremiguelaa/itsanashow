import React from 'react';

import contacts from 'assets/contacts.jpg';
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
      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          <p className={classes.salute}>Hello there!</p>
          <p className={classes.lead}>We'd love to chat!</p>
          <dl>
            <dt>General Questions</dt>
            <dd>
              <a
                className={classes.mail}
                href="mailto:hello@itsanashow.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                hello@itsanashow.com
              </a>
            </dd>
            <dt>New Business Inquires</dt>
            <dd>
              <div className={classes.inquires}>
                Tell us everything about your challenge and we'll get back to
                you once the bell rings.
              </div>
            </dd>
          </dl>
          <div>
            <a
              href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
              target="_blank"
              rel="noreferrer"
              className={classes.quote}
            >
              Request a quote
            </a>
          </div>
          <div className={classes.address}>
            Rua Bramcamp 84 3D
            <br />
            1250-052 Lisboa
            <br />
            Portugal
          </div>
          <div className={classes.footer}>
            <p className={classes.slogan}>Let's get social!</p>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/company/itsanashow-studio"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/itsanashow.studio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/ItsanashowStudio"
                  target="_blank"
                  rel="noreferrer"
                >
                  Behance
                </a>
              </li>
              <li>
                <a
                  href="https://vimeo.com/itsanashowstudio"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vimeo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);
export default Modal;
