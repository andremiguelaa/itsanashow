import React, { useRef, useContext } from "react";
import Link from "next/link";
import Lottie from "react-lottie-player";

import AppContext from "src/AppContext";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Button from "src/components/Button/Button";
import arrow from "src/assets/buttons/arrowB.json";

import classes from "./HomepageWork.module.scss";

const HomepageWorkItem = ({ portfolioHighlight }) => {
  const { setCursorType } = useContext(AppContext);
  const lottie = useRef();
  return (
    <li>
      <Link
        href={`/work/${portfolioHighlight.Title}`}
        onMouseEnter={() => {
          lottie.current.goToAndPlay(0);
          setCursorType("view");
        }}
        onMouseLeave={() => {
          setCursorType("default");
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${portfolioHighlight.Image}`}
          alt={portfolioHighlight.Title}
        />
        <div className={classes.text}>
          <p className={classes.name}>{portfolioHighlight.Title}</p>
          {portfolioHighlight.Tags.length > 0 && (
            <p className={classes.tags}>{portfolioHighlight.Tags.join(", ")}</p>
          )}
          <div className={classes.arrow}>
            <Lottie ref={lottie} animationData={arrow} loop={false} />
          </div>
        </div>
      </Link>
    </li>
  );
};

const HomepageWork = ({ portfolioHighlights }) => (
  <section className={classes.work}>
    <div className="wrapper">
      <div className={classes.mainText}>
        <p className={classes.lead}>
          <AnimatedText>Our work</AnimatedText>
        </p>
        <p className={classes.description}>
          <AnimatedText delay={100}>
            Visuals that dominate, inspire,
          </AnimatedText>
          <br />
          <AnimatedText delay={200}>
            and leave your competition jealous 
          </AnimatedText>
        </p>
      </div>
      {portfolioHighlights.length > 0 && (
        <ul className={classes.portfolioHighlights}>
          {portfolioHighlights.map((portfolioHighlight) => (
            <HomepageWorkItem
              key={portfolioHighlight.id}
              portfolioHighlight={portfolioHighlight}
            />
          ))}
        </ul>
      )}
      <div className={classes.cta}>
        <Button text={<strong>Dive Deeper</strong>} arrow={arrow} />
      </div>
    </div>
  </section>
);

export default HomepageWork;
