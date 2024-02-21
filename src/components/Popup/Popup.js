import React, { useContext, useState, useEffect } from "react";
import classnames from "classnames";

import { AppContext } from "src/AppContext";
import useRequest from "src/utils/useRequest";

import classes from "./Popup.module.scss";

const Popup = () => {
  const { popup, setPopup, setCursorType } = useContext(AppContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (popup) {
      setError(false);
    }
  }, [popup]);

  const { request: submit, loading } = useRequest({
    url: "leads",
    method: "POST",
    callback: true,
    onError: () => {
      setError(true);
    },
    onSuccess: () => {
      setSuccess(true);
    },
  });

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
          className={classes.close}
          aria-label="Close"
          disabled={loading}
          onMouseEnter={() => {
            setCursorType("bigger");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        />
        {!error && !success && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.target);
              const email = data.get("email");
              submit({
                data: {
                  Email: email,
                },
              });
            }}
          >
            <p className={classes.lead}>Discover our capabilities deck</p>
            <p className={classes.mainCopy}>
              A small step for your
              <br />
              next big adventure!
            </p>
            <div className={classes.mainForm}>
              <div className={classes.inputs}>
                <input
                  className={classes.input}
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email Address Here!"
                  onMouseEnter={() => {
                    setCursorType("bigger");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                />
                <label
                  className={classes.checkbox}
                  onMouseEnter={() => {
                    setCursorType("bigger");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                >
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
              </div>
              <button
                className={classes.submit}
                disabled={loading}
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                Send
              </button>
            </div>
          </form>
        )}
        {success && (
          <div>
            <p className={classes.mainCopySuccess}>Greatness awaits!</p>
            <p className={classes.information}>
              Check your email box to discover our capabilities deck and all the
              magical secrets we have to show you!
            </p>
            <p className={classes.disclaimer}>
              If you don&apos;t find our email in your inbox, please check your spam
              or junk folder.
            </p>
          </div>
        )}
        {error && (
          <div>
            <p className={classes.mainCopySuccess}>Oopsie!</p>
            <p className={classes.information}>
              Something went wrong. Please try again later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
