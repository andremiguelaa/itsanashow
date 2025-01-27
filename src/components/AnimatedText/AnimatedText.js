import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { InView } from 'react-intersection-observer';

import classes from './AnimatedText.module.scss';

const AnimatedText = ({ children, delay = 0 }) => {
  const [words, setWords] = useState(
    children.split(' ').map((word, index) => ({
      id: index,
      text: word,
      visible: false,
    }))
  );

  return (
    <InView
      as="span"
      onChange={(InView) => {
        if (InView) {
          setWords((prev) =>
            prev.map((word) => ({
              ...word,
              visible: true,
            }))
          );
        } else {
          setWords((prev) =>
            prev.map((word) => ({
              ...word,
              visible: false,
            }))
          );
        }
      }}
    >
      {words.map((word, index) => (
        <span
          className={classnames(classes.word, {
            [classes.visible]: word.visible,
          })}
          style={{
            transitionDelay: `${word.visible ? index * 100 + delay : 0}ms`,
          }}
          key={word.id}
        >
          {word.text}&nbsp;
        </span>
      ))}
    </InView>
  );
};

export default AnimatedText;
