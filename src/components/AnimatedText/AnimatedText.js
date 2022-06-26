import React, { useState, useCallback } from 'react';
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

  const showWords = useCallback(() => {
    setWords((prev) =>
      prev.map((word) => ({
        ...word,
        visible: true,
      }))
    );
  }, []);

  return (
    <InView
      as="span"
      onChange={(InView) => {
        if (InView) {
          setTimeout(() => {
            showWords();
          }, delay);
        }
      }}
      triggerOnce
    >
      {words.map((word, index) => (
        <span
          className={classnames(classes.word, {
            [classes.visible]: word.visible,
          })}
          style={{ transitionDelay: `${index * 50}ms` }}
          key={word.id}
        >
          {word.text}&nbsp;
        </span>
      ))}
    </InView>
  );
};

export default AnimatedText;
