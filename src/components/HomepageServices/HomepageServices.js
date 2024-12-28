import React, { useContext } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import AppContext from "src/AppContext";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./HomepageServices.module.scss";

const HomepageServices = ({ skills }) => {
  const { setCursorType } = useContext(AppContext);

  return (
    <section className={classes.skills}>
      <div className="wrapper">
        <div className={classes.ctaWrapper}>
          <Link
            href="/work"
            className={classes.cta}
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            Wanna see more?
          </Link>
        </div>
        <p className={classes.lead}>
          <AnimatedText>What we do</AnimatedText>
        </p>
        <p className={classes.description}>
          <AnimatedText delay={200}>
            Fast-moving trends require rock-solid core skills. Our savoir-faire
            is broader, with a proven track record.
          </AnimatedText>
        </p>
      </div>
      {skills.length > 0 && (
        <>
          <Marquee gradient={false} speed={50}>
            <ul className={classes.skillsList}>
              {skills.slice(0, skills.length / 2).map((skill) => (
                <li key={skill.id}>{skill.Text}</li>
              ))}
            </ul>
          </Marquee>
          <Marquee gradient={false} speed={50} direction="right">
            <ul className={classes.skillsList}>
              {skills.slice(skills.length / 2).map((skill) => (
                <li key={skill.id}>{skill.Text}</li>
              ))}
            </ul>
          </Marquee>
        </>
      )}
      <div className="wrapper">
        <div className={classes.ctaWrapper}>
          <Link
            href="/us"
            className={classes.cta}
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            Get to know us!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageServices;
