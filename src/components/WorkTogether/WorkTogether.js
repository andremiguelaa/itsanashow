import React, { useRef, useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { useParallax } from 'react-scroll-parallax';
import { useIsVisible } from 'react-is-visible';
import isTouchDevice from 'is-touch-device';

import AppContext from 'AppContext';

import classes from './WorkTogether.module.scss';

const isTouch = isTouchDevice();

const alpha = [
  '!',
  '#',
  '$',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  'A',
  'G',
  'T',
  'H',
  'Y',
  'Z',
  'X',
  'W',
  'O',
  'K',
  'Q',
  'S',
];

const wordList = [
  'Animation',
  'UX/UI',
  'Branding',
  'Storytelling',
  'Video',
  'Illustration',
  'Filmmaking',
];

const WorkTogether = () => {
  const { setCursorType } = useContext(AppContext);

  const toAnimateWord = useRef();
  const isToAnimateWordVisible = useIsVisible(toAnimateWord);
  const [animatingWord, setAnimatingWord] = useState(false);
  const [nextAnimationWordIndex, setNextAnimationWordIndex] = useState(0);

  const { ref: workBall1ref } = useParallax({ speed: isTouch ? 5 : 15 });
  const { ref: workBall2ref } = useParallax({ speed: isTouch ? 10 : 25 });
  const { ref: workBall3ref } = useParallax({ speed: isTouch ? 15 : 35 });

  const animateWord = () => {
    if (animatingWord) {
      return;
    }
    const nextWordIndex = nextAnimationWordIndex;
    setNextAnimationWordIndex(
      nextAnimationWordIndex < wordList.length - 1
        ? nextAnimationWordIndex + 1
        : 0
    );
    let element = toAnimateWord.current;
    setAnimatingWord(true);
    const initialWord = element.innerText;
    const mixedWord = initialWord.split('');
    const delay = 50;
    mixedWord.forEach((_, index) => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          mixedWord[index] = `<span class="${classnames(
            classes.letter,
            classes.changing
          )}">${alpha[Math.floor(Math.random() * alpha.length)]}</span>`;
          element.innerHTML = mixedWord.join('');
        }, delay * index + i * delay);
      }
      setTimeout(() => {
        mixedWord[index] = `<span class="${classnames(classes.letter, {
          [classes.hidden]: !wordList[nextWordIndex].split('')[index],
        })}">${
          wordList[nextWordIndex].split('')[index]
            ? wordList[nextWordIndex].split('')[index]
            : '&nbsp;'
        }</span>`;
        element.innerHTML = mixedWord.join('');
        if (index === mixedWord.length - 1) {
          setAnimatingWord(false);
        }
      }, delay * index + delay * 6);
    });
  };

  useEffect(() => {
    if (isToAnimateWordVisible && toAnimateWord) {
      animateWord(toAnimateWord.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToAnimateWordVisible, toAnimateWord]);

  return (
    <section className={classes.workTogether}>
      <div className={classnames('wrapper', classes.text)}>
        <p className={classes.lead}>Let's work together</p>
        <p className={classes.description}>
          We're always thinking about the future of{' '}
          <span
            ref={toAnimateWord}
            className={classes.animation}
            onClick={() => animateWord()}
            onMouseEnter={() => {
              setCursorType('none');
            }}
            onMouseLeave={() => {
              setCursorType('default');
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </p>
        <p className={classes.mobileText}>
          Tell us everything about your challenge and we'll get back to you once
          the bell rings.
        </p>
        <a
          className={classes.quote}
          href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => {
            setCursorType('bigger');
          }}
          onMouseLeave={() => {
            setCursorType('default');
          }}
        >
          <span>Request a quote</span>
        </a>
      </div>
      <div
        className={classnames(classes.ball, classes.ball1)}
        ref={workBall1ref}
      />
      <div
        className={classnames(classes.ball, classes.ball2)}
        ref={workBall2ref}
      />
      <div
        className={classnames(classes.ball, classes.ball3)}
        ref={workBall3ref}
      />
    </section>
  );
};

export default WorkTogether;
