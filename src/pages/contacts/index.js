import React, { useContext, useState } from "react";
import Head from "next/head";
import classNames from "classnames";

import useRequest from "src/utils/useRequest";
import AppContext from "src/AppContext";
import SubmitYourRequest from "src/components/SubmitYourRequest/SubmitYourRequest";

import inIcon from "src/assets/social/IN.svg";
import beIcon from "src/assets/social/Be.svg";
import igIcon from "src/assets/social/IG.svg";
import viIcon from "src/assets/social/VI.svg";
import drIcon from "src/assets/social/DR.svg";

import Social from "./Social";

import classes from "./styles.module.scss";

const Contacts = () => {
  const { setCursorType } = useContext(AppContext);

  const [selectChanged, setSelectChanged] = useState(false);

  const { request, loading } = useRequest({
    url: "requests",
    method: "POST",
    callback: true,
    onSuccess: () => {
      alert("Success");
    },
    onError: () => {
      alert("Error");
    },
  });

  const submitForm = (event) => {
    event.preventDefault();
    let object = {};
    const data = new FormData(event.target);
    data.forEach((value, key) => {
      if (object[key]) {
        object[key] = `${object[key]}, ${value}`;
      } else {
        object[key] = value;
      }
    });
    request({ data: object });
  };

  return (
    <>
      <Head>
        <title>Itsanashow Studio | Contact Us</title>
        <meta
          name="description"
          content='Meet the Itsanashow Creative Studio team, where we embrace challenges with creative hunger and a passion for overcoming obstacles. Our motto: "We love to give shape to beautiful and meaningful stories."'
        />
      </Head>
      <section className={classes.contacts}>
        <div className="wrapper">
          <div className={classes.content}>
            <div className={classes.header}>
              <p className={classes.lead}>Got a bold idea?</p>
              <p className={classes.action}>Let’s make it happen.</p>
              <p className={classes.text}>
                Ready to transform your brand into something unforgettable?
                <br />
                Fill out the form, and we’ll get back to you in no time!
              </p>
              <div className={classes.socialDesktop}>
                <Social />
              </div>
            </div>
            <div className={classes.form}>
              <form onSubmit={submitForm}>
                <div className={classes.formRow}>
                  <div className={classes.formField}>
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      required
                      name="Name"
                      type="text"
                      placeholder="Your name..."
                    />
                  </div>
                  <div className={classes.formField}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      required
                      name="Email"
                      type="email"
                      placeholder="Your email..."
                    />
                  </div>
                </div>
                <div className={classes.formRow}>
                  <div className={classes.formField}>
                    <label htmlFor="website">Company website</label>
                    <input
                      id="website"
                      name="CompanyWebsite"
                      type="text"
                      placeholder="Enter url..."
                    />
                  </div>
                  <div className={classes.formField}>
                    <label htmlFor="budget">Estimated budget</label>
                    <select
                      name="EstimatedBudget"
                      id="budget"
                      required
                      onChange={() => setSelectChanged(true)}
                      className={classNames({
                        [classes.changed]: selectChanged,
                      })}
                    >
                      <option value="" disabled selected>
                        Select...
                      </option>
                      <option value="$5K - $10K">$5K - $10K</option>
                      <option value="$10K - $20K">$10K - $20K</option>
                      <option value="$20K - $30K">$20K - $30K</option>
                      <option value="$30K - $50K">$30K - $50K</option>
                      <option value="+ $50K">+ $50K</option>
                    </select>
                  </div>
                </div>
                <div className={classes.formRow}>
                  <fieldset>
                    <legend>
                      <strong>What service are you looking for?</strong>
                    </legend>
                    <input
                      type="checkbox"
                      name="Service"
                      value="Animation"
                      id="Animation"
                    />
                    <label
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                      htmlFor="Animation"
                    >
                      Animation
                    </label>
                    <input
                      type="checkbox"
                      name="Service"
                      value="Branding"
                      id="Branding"
                    />
                    <label
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                      htmlFor="Branding"
                    >
                      Branding
                    </label>
                    <input
                      type="checkbox"
                      name="Service"
                      value="Webdesign"
                      id="Webdesign"
                    />
                    <label
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                      htmlFor="Webdesign"
                    >
                      Webdesign
                    </label>
                    <input
                      type="checkbox"
                      name="Service"
                      value="Illustration"
                      id="Illustration"
                    />
                    <label
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                      htmlFor="Illustration"
                    >
                      Illustration
                    </label>
                    <input
                      type="checkbox"
                      name="Service"
                      value="Iconography"
                      id="Iconography"
                    />
                    <label
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                      htmlFor="Iconography"
                    >
                      Iconography
                    </label>
                    <input
                      type="checkbox"
                      name="Service"
                      value="Other"
                      id="Other"
                    />
                    <label
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                      htmlFor="Other"
                    >
                      Other
                    </label>
                  </fieldset>
                </div>
                <div className={classes.formRow}>
                  <div className={classes.formFieldFull}>
                    <label htmlFor="message">
                      What’s your project all about?
                    </label>
                    <textarea
                      id="message"
                      required
                      name="About"
                      placeholder="We’re all ears! Dive deep into your project — share your vision, goals, ideas, and challenges. The more details you give us, the better we can understand your needs and tailor our approach."
                    ></textarea>
                  </div>
                </div>
                <div className={classes.formRow}>
                  <fieldset>
                    <legend>
                      <strong>Where did you hear about us?</strong>
                      <br />
                      We would love to know what we have in common. (You can
                      select more than one!)
                    </legend>
                    <input
                      type="checkbox"
                      name="Referral"
                      value="Friend Referral"
                      id="FriendReferral"
                    />
                    <label
                      htmlFor="FriendReferral"
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      Friend Referral
                    </label>
                    <input
                      type="checkbox"
                      name="Referral"
                      value="Instagram"
                      id="Instagram"
                    />
                    <label
                      htmlFor="Instagram"
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      Instagram
                    </label>
                    <input
                      type="checkbox"
                      name="Referral"
                      value="Google"
                      id="Google"
                    />
                    <label
                      htmlFor="Google"
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      Google
                    </label>
                    <input
                      type="checkbox"
                      name="Referral"
                      value="Behance"
                      id="Behance"
                    />
                    <label
                      htmlFor="Behance"
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      Behance
                    </label>
                    <input
                      type="checkbox"
                      name="Referral"
                      value="LinkedIn"
                      id="LinkedIn"
                    />
                    <label
                      htmlFor="LinkedIn"
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      LinkedIn
                    </label>
                    <input
                      type="checkbox"
                      name="Referral"
                      value="Other"
                      id="OtherReferral"
                    />
                    <label
                      htmlFor="OtherReferral"
                      onMouseEnter={() => {
                        setCursorType("bigger");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      Other
                    </label>
                  </fieldset>
                </div>
                <div className={classes.formSubmit}>
                  <SubmitYourRequest disabled={loading} />
                </div>
              </form>
            </div>
          </div>
          <div className={classes.socialMobile}>
            <Social />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacts;
