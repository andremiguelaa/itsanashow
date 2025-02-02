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
    title: "Animation",
    text: "With compelling storytelling at its core, our 2D and 3D animations go beyond visuals—they bring your brand’s narrative to life with precision and creativity. From dynamic motion graphics to character-driven animations, we create striking visuals that engage your audience and leave a lasting impression.",
    image: animation,
  },
  {
    title: "Branding",
    text: "Our holistic branding approach transforms visuals into stories that endure. From designing bold logos and defining brand guidelines to developing animation languages, we ensure every element communicates your brand’s unique identity across all media.",
    image: branding,
  },
  {
    title: "Webdesign",
    text: "We craft responsive, SEO-optimized websites designed to captivate. With seamless UX/UI and engaging interactive features, our websites deliver intuitive user experiences on any device, boosting your brand’s online visibility.",
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
          <AnimatedText delay={100}>
            Engage your audience and amplify your voice with our...
          </AnimatedText>
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
                <p className={classes.text}>{service.text}</p>
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
          <Button text="Let’s get started!" arrow={arrow} target="/contacts" />
        </div>
      </div>
    </section>
  );
};

export default HomepageServices;
