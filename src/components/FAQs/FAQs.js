import React, { useContext, useMemo, useState, useEffect } from "react";
import classNames from "classnames";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Markdown from "src/components/Markdown/Markdown";
import illustration from "src/assets/faq_illustration.svg";

import classes from "./FAQs.module.scss";

const FAQs = () => {
  const { setCursorType } = useContext(AppContext);
  const [faqs, setFaqs] = useState();

  const { data, error, loading } = useRequest({
    url: "faqs",
    method: "GET",
  });

  useEffect(() => {
    if (data) {
      setFaqs(
        data.data.map((item) => ({
          id: item.id,
          question: item.attributes.Question,
          answer: item.attributes.Answer,
          open: false,
        }))
      );
    }
  }, [data]);

  if (!faqs) {
    return null;
  }

  return (
    <section
      className={classes.faqs}
      itemscope
      itemtype="https://schema.org/FAQPage"
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
          <dl>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={classNames(classes.faq, {
                  [classes.open]: faq.open,
                })}
                itemscope
                itemprop="mainEntity"
                itemtype="https://schema.org/Question"
              >
                <dt
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
                  <span itemprop="name">{faq.question}</span>
                  <div className={classes.toggleButton} />
                </dt>
                <dd
                  itemscope
                  itemprop="acceptedAnswer"
                  itemtype="https://schema.org/Answer"
                >
                  <span itemprop="text">
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
