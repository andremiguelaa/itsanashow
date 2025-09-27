import React, { useContext, useMemo, useState, useEffect } from "react";
import classNames from "classnames";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Markdown from "src/components/Markdown/Markdown";
import illustration from "src/assets/faq_illustration.svg";

import classes from "./FAQs.module.scss";

const FAQs = ({ faqs: data }) => {
  const { setCursorType } = useContext(AppContext);
  const [faqs, setFaqs] = useState();

  useEffect(() => {
    setFaqs(
      data.map((item) => ({
        ...item,
        open: false,
      }))
    );
  }, [data]);

  if (data.length < 1) {
    return null;
  }

  return (
    <section
      className={classes.faqs}
      itemScope
      itemType="https://schema.org/FAQPage"
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
          <img
            src={illustration.src}
            className={classes.illustration}
            alt="illustration"
          />
        </div>
        <div className={classes.content}>
          <dl className={classes.faqList}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={classNames(classes.faq, {
                  [classes.open]: faq.open,
                })}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <dt
                  className={classes.faqTitle}
                  onClick={() => {
                    setFaqs((prev) => {
                      const newFaqs = prev.map((item) =>
                        item.id === faq.id
                          ? {
                              ...item,
                              open: !item.open,
                            }
                          : item
                      );

                      return newFaqs;
                    });
                  }}
                  onMouseEnter={() => {
                    setCursorType("bigger");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                >
                  <span itemProp="name">{faq.question}</span>
                  <div className={classes.toggleButton} />
                </dt>
                <dd
                  className={classes.faqContent}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">
                    <Markdown content={faq.answer} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
