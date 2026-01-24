import React, { useContext, useState, useRef } from "react";
import classNames from "classnames";
import Lottie from "react-lottie-player";
import { Collapse } from "react-collapse";

import AppContext from "src/AppContext";
import Markdown from "src/components/Markdown/Markdown";
import toggleButton from "src/assets/more-close-button.json";

import classes from "./FAQs.module.scss";

const buttonFrameLimits = {
  start: 0,
  end: 30,
};

const FAQs = ({ faq }) => {
  const { setCursorType } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const buttonFrame = useRef(buttonFrameLimits.start);
  const buttonTimer = useRef();
  const [buttonFrameState, setButtonFrameState] = useState(
    buttonFrameLimits.start
  );

  const numberChange = (start, end) => {
    buttonFrame.current = start;
    clearInterval(buttonTimer.current);
    buttonTimer.current = setInterval(() => {
      const direction = start > end ? -1 : 1;
      if (buttonFrame.current === end) {
        clearInterval(buttonTimer.current);
      } else {
        buttonFrame.current = buttonFrame.current + direction;
      }
      setButtonFrameState(buttonFrame.current);
    }, 20);
  };

  return (
    <div
      key={faq.id}
      className={classNames(classes.faq, {
        [classes.open]: open,
      })}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <dt
        className={classes.faqTitle}
        onClick={() => {
          if (open) {
            numberChange(buttonFrameLimits.end, buttonFrameLimits.start);
          } else {
            numberChange(buttonFrameLimits.start, buttonFrameLimits.end);
          }
          setOpen(!open);
        }}
        onMouseEnter={() => {
          setCursorType("bigger");
        }}
        onMouseLeave={() => {
          setCursorType("default");
        }}
      >
        <span itemProp="name">{faq.question}</span>
        <div className={classes.toggleButton}>
          <Lottie animationData={toggleButton} goTo={buttonFrameState} />
        </div>
      </dt>
      <dd
        className={classes.faqContent}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <Collapse isOpened={open}>
          <div className={classes.faqInnerContent}>
            <span itemProp="text">
              <Markdown content={faq.answer} />
            </span>
          </div>
        </Collapse>
      </dd>
    </div>
  );
};

export default FAQs;
