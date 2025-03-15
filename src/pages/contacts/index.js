import React, { useContext, useState } from "react";
import Head from "next/head";
import classNames from "classnames";
import Lottie from "react-lottie-player";

import useRequest from "src/utils/useRequest";
import AppContext from "src/AppContext";
import SubmitYourRequest from "src/components/SubmitYourRequest/SubmitYourRequest";
import Button from "src/components/Button/Button";
import successIcon from "src/assets/formSuccess.json";
import errorIcon from "src/assets/formError.json";
import arrow from "src/assets/buttons/arrowB.json";

import Social from "./Social";

import classes from "./styles.module.scss";

const Contacts = () => {
  const { setCursorType } = useContext(AppContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [selectChanged, setSelectChanged] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    CompanyWebsite: "",
    EstimatedBudget: "",
    Service: "",
    About: "",
    Referral: "",
  });

  const { request, loading } = useRequest({
    url: "requests",
    method: "POST",
    callback: true,
    onSuccess: () => {
      setSuccess(true);
      window.scrollTo(0, 0);
    },
    onError: () => {
      setError(true);
      window.scrollTo(0, 0);
    },
  });

  const submitForm = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      Service: formData.Service.join(", "),
      Referral: formData.Referral.join(", "),
    };
    request({ data });
  };

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    console.log(name);
    if (event.target.checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...prev[name], event.target.value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name].filter((item) => item !== event.target.value),
      }));
    }
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
                <strong style={{ fontWeight: 600 }}>
                  Ready to transform your brand into something unforgettable?
                </strong>
                <br />
                Give us the scoop! We want all the juicy details — don’t just
                say “an animation”, share your vision. The more we know, the
                faster we can jump into making magic happen! 🚀
              </p>
              <div className={classes.socialDesktop}>
                <Social />
              </div>
            </div>
            {success && (
              <div className={classes.output}>
                <div className={classes.icon}>
                  <Lottie animationData={successIcon} play />
                </div>
                <p className={classes.title}>
                  <strong>Success!</strong>
                  <br />
                  Your bold idea is in good hands.
                </p>
                <p className={classes.text}>
                  <strong>Thanks for sharing your vision with us!</strong> We’ll
                  dive in and get back to you in no time. Exciting things are on
                  the way!
                </p>
                <Button
                  text="Awesome! Take me home"
                  target="/"
                  arrow={arrow}
                  reverted
                />
              </div>
            )}
            {error && (
              <div className={classes.output}>
                <div className={classes.icon}>
                  <Lottie animationData={errorIcon} play />
                </div>
                <p className={classes.title}>
                  <strong>Oops!</strong>
                  <br />
                  Something went wrong.
                </p>
                <p className={classes.textError}>
                  Looks like the form didn’t go through. Please refresh the page
                  and give it another go. If the problem persists, feel free to
                  reach out to us at{" "}
                  <a
                    href="mailto:hello@itsanashow.com"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    hello@itsanashow.com
                  </a>
                  .
                </p>
                <Button
                  text="Give it another go"
                  arrow={arrow}
                  onClick={() => {
                    setError(false);
                  }}
                />
              </div>
            )}
            <div className={classes.form} hidden={success || error}>
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
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          Name: event.target.value,
                        }))
                      }
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
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          Email: event.target.value,
                        }))
                      }
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
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          CompanyWebsite: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className={classes.formField}>
                    <label htmlFor="budget">Estimated budget</label>
                    <select
                      name="EstimatedBudget"
                      id="budget"
                      required
                      onChange={() => {
                        setFormData((prev) => ({
                          ...prev,
                          EstimatedBudget: event.target.value,
                        }));
                        setSelectChanged(true);
                      }}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          About: event.target.value,
                        }))
                      }
                    />
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
                      onChange={handleCheckboxChange}
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
