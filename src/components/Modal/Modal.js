import React, { useContext } from "react";

import { AppContext } from "src/AppContext";
import contacts from "src/assets/contacts.jpg";
import contactsVideo from "src/assets/contacts.mp4";

import classes from "./Modal.module.scss";

const Modal = () => {
  const { modal, setModal, setCursorType } = useContext(AppContext);

  return (
    <div
      className={`${classes.modalWrapper} ${modal ? classes.openModal : ""}`}
    >
      <section className={classes.modal}>
        <button
          className={classes.close}
          onClick={() => setModal(false)}
          onMouseEnter={() => {
            setCursorType("bigger");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        >
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
          <video
            src={contactsVideo}
            poster={contacts.src}
            autoPlay
            loop
            muted
          />
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.content}>
            <p className={classes.salute}>Hello there!</p>
            <p className={classes.lead}>We&apos;d love to chat!</p>
            <dl>
              <dt>General Questions</dt>
              <dd>
                <a
                  className={classes.mail}
                  href="mailto:hello@itsanashow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => {
                    setCursorType("none");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                >
                  hello@itsanashow.com
                </a>
              </dd>
              <dt>New Business Inquires</dt>
              <dd>
                <div className={classes.inquires}>
                  Tell us everything about your challenge and we&apos;ll get
                  back to you once the bell rings.
                </div>
              </dd>
            </dl>
            <div>
              <a
                href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
                target="_blank"
                rel="noreferrer"
                className={classes.quote}
                onMouseEnter={() => {
                  setCursorType("none");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                Request a quote
              </a>
            </div>
            <div className={classes.address}>
              Palácio Rosa, R. Seara Nova 5
              <br />
              1250-002 Lisboa
              <br />
              Portugal
            </div>
            <div className={classes.footer}>
              <p className={classes.slogan}>Let&apos;s get social!</p>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/company/itsanashow-studio"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/itsanashow.studio/"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.behance.net/ItsanashowStudio"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Behance
                  </a>
                </li>
                <li>
                  <a
                    href="https://vimeo.com/itsanashowstudio"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Vimeo
                  </a>
                </li>
                <li>
                  <a
                    href="https://dribbble.com/itsanashow_studio"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    Dribble
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={classes.ball}></div>
        </div>
      </section>
    </div>
  );
};

export default Modal;
