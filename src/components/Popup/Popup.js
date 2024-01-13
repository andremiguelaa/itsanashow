import React, { useContext } from "react";
import classnames from "classnames";

import { AppContext } from "src/AppContext";

import classes from "./Popup.module.scss";

const Popup = () => {
  const { popup, setPopup } = useContext(AppContext);
  return (
    <div
      className={classnames(classes.overlay, {
        [classes.open]: popup,
      })}
    >
      <div className={classes.modal}>
        <button
          onClick={() => {
            setPopup(false);
          }}
        >
          Close
        </button>
        <form>
          <p>Discover our capabilities deck</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <input type="email" required placeholder="Your Email Address Here!" />
          <label>
            <input type="checkbox" required />
            <span>
              Yes! I accept the{" "}
              <a target="_blank" href="/privacy-policy">
                Privacy Policy
              </a>{" "}
              and authorize to be contacted and receive information from
              Itsanashow Creative Studio.
            </span>
          </label>
          <button>Let the show begin!</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
