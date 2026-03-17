import React, { useState } from "react";
import classNames from "classnames";

import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Button from "src/components/Button/Button";
import arrow from "src/assets/buttons/arrowG.json";
import animation from "src/assets/animation.gif";
import branding from "src/assets/branding.jpg";
import webdesign from "src/assets/webdesign.gif";

import classes from "./HomepageServices.module.scss";

const SERVICES = [
  {
    title: "Motion",
    text: "<b>Movement without intention is just noise.</b> From brand films and broadcast identities to motion systems that scale across every touchpoint, we start with what your audience needs to feel, then work backwards through every frame, every beat and every transition, until motion and message become the same thing.",
    image: animation,
  },
  {
    title: "Branding",
    text: "<b>A brand isn't just how it looks. It's how it moves.</b> From logo and visual identity to animation languages and brand guidelines, we build systems that hold together under pressure because coherence is what turns recognition into trust.",
    image: branding,
  },
  {
    title: "Web",
    text: "<b>Your website is the first chapter of your brand's story.</b> From UX architecture to UI animation and interaction design, we design until every interaction feels inevitable rather than just designed. No filler, no friction. Just design that does its job beautifully.",
    image: webdesign,
  },
];

const HomepageServices = () => {
  const [activeService, setActiveService] = useState(SERVICES[0].title);
  return (
    <section className={classes.services}>
      <div className="wrapper">
        <p className={classes.lead}>
          <AnimatedText>Our Services</AnimatedText>
        </p>
        <p className={classes.description}>
          <AnimatedText delay={100}>Different outputs.</AnimatedText>
          <br />
          <AnimatedText delay={200}>One narrative thread.</AnimatedText>
        </p>
        <div className={classes.content}>
          <ul className={classes.servicesList}>
            {SERVICES.map((service) => (
              <li
                key={service.title}
                className={classNames(classes.service, {
                  [classes.active]: service.title === activeService,
                })}
              >
                <h2 className={classes.title}>{service.title}</h2>
                <img
                  src={service.image.src}
                  alt={service.title}
                  className={classes.image}
                />
                <p className={classes.text} dangerouslySetInnerHTML={{ __html: service.text }} />
              </li>
            ))}
          </ul>
          <nav className={classes.servicesNav}>
            {SERVICES.map((service) => (
              <button
                key={service.title}
                className={classNames(classes.button, {
                  [classes.active]: service.title === activeService,
                })}
                onClick={() => {
                  setActiveService(service.title);
                }}
                onMouseEnter={() => {
                  setActiveService(service.title);
                }}
              >
                {service.title}
              </button>
            ))}
          </nav>
        </div>
        <div className={classes.cta}>
          <Button text="Start a Project" arrow={arrow} target="/contacts" />
        </div>
      </div>
    </section>
  );
};

export default HomepageServices;
