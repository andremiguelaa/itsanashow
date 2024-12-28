import React, { useContext } from "react";
import Link from "next/link";

import AppContext from "src/AppContext";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./HomepageWork.module.scss";

const HomepageWork = ({ portfolioHighlights }) => {
  const { setCursorType } = useContext(AppContext);

  return (
    <section className={classes.work}>
      <div className="wrapper">
        <div className={classes.mainText}>
          <p className={classes.lead}>
            <AnimatedText>Our work</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={100}>
              Visuals that dominate, inspire, and leave your competition
              jealous 
            </AnimatedText>
          </p>
        </div>
        {portfolioHighlights.length > 0 && (
          <ul className={classes.portfolioHighlights}>
            {portfolioHighlights.map((portfolioHighlight) => (
              <li key={portfolioHighlight.id}>
                <Link
                  href={`/work/${portfolioHighlight.Title}`}
                  onMouseEnter={() => {
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
                      <p className={classes.tags}>
                        {portfolioHighlight.Tags.join(", ")}
                      </p>
                    )}
                    <div className={classes.arrow} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HomepageWork;
