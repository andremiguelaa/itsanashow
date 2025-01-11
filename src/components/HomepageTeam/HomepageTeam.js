import React from "react";

import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Button from "src/components/Button/Button";
import arrow from "src/assets/buttons/arrowG.json";
import video from "src/assets/contacts.mp4";

import classes from "./HomepageTeam.module.scss";

const HomepageTeam = () => (
  <section className={classes.team}>
    <video
      className={classes.videoMedia}
      src={video}
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="wrapper">
      <div className={classes.content}>
        <p className={classes.lead}>
          <AnimatedText>Meet the team</AnimatedText>
        </p>
        <p className={classes.description}>
          <AnimatedText delay={150}>
            Big enough to tackle any challenge, small enough to make it personal
          </AnimatedText>
        </p>
        <div className={classes.cta}>
          <Button text="Discover the squad" target="/us" arrow={arrow} />
        </div>
      </div>
    </div>
  </section>
);

export default HomepageTeam;
