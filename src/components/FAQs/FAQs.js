import React, { useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Lottie from "react-lottie-player";

import AnimatedText from "src/components/AnimatedText/AnimatedText";
import groovy from "src/assets/GroovyFAQs.json";

import FAQ from "./FAQ";

import classes from "./FAQs.module.scss";

const FAQs = ({ faqs = [], aboveContentLoaded = false }) => {
  const router = useRouter();
  const pageKey = router.asPath;

  useEffect(() => {
    if (pageKey.includes("#faqs") && aboveContentLoaded) {
      document.getElementById("faqs").scrollIntoView();
    }
  }, [pageKey, aboveContentLoaded]);

  return (
    <section
      className={classes.faqs}
      itemScope
      itemType="https://schema.org/FAQPage"
      id="faqs"
    >
      <div className={classNames("wrapper", classes.wrapper)}>
        <div className={classes.header}>
          <p className={classes.lead}>
            <AnimatedText>FAQS</AnimatedText>
          </p>
          <p className={classes.description}>
            <strong>
              <AnimatedText delay={50}>Frequently Asked Questions</AnimatedText>
            </strong>
            <span className={classes.note}>
              <AnimatedText delay={200}>
                (a.k.a. everything you wanted to ask a creative studio but were
                too shy to ask)
              </AnimatedText>
            </span>
          </p>
          <div className={classes.illustration}>
            <Lottie animationData={groovy} loop play />
          </div>
        </div>
        <div className={classes.content}>
          <dl className={classes.faqList}>
            {faqs.map((faq) => (
              <FAQ faq={faq} key={faq.id} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
