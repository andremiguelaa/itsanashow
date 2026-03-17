import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";

import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Button from "src/components/Button/Button";
import arrow from "src/assets/buttons/arrowG.json";
import video from "src/assets/contacts.mp4";

import classes from "./HomepageTeam.module.scss";

const HomepageTeam = () => {
  const threshold = useRef();
  const element = useRef();
  const [above, setAbove] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const listenToScroll = () => {
    if (threshold.current.getBoundingClientRect().top < 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    if (
      threshold.current.getBoundingClientRect().top <
      -element.current.clientHeight
    ) {
      setAbove(true);
    } else {
      setAbove(false);
    }
  };

  useEffect(() => {
    global.document.addEventListener("scroll", listenToScroll);
    return () => {
      global.document.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  return (
    <>
      <div ref={threshold} />
      <div
        className={classnames(classes.placeholder, {
          [classes.scrolled]: scrolled,
        })}
        style={{ height: element.current ? element.current.clientHeight : 0 }}
      ></div>
      <section
        className={classnames(classes.team, {
          [classes.scrolled]: scrolled,
          [classes.above]: above,
        })}
        ref={element}
      >
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
              <AnimatedText>Small studio • Wide Reach</AnimatedText>
            </p>
            <p className={classes.description}>
              <AnimatedText delay={200}>The people</AnimatedText>
              <br />
              <AnimatedText delay={300}>behind the work.</AnimatedText>
            </p>
            <div className={classes.cta}>
              <Button text="Meet the team" target="/us" arrow={arrow} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomepageTeam;
