import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useIsVisible } from 'react-is-visible';
import classnames from 'classnames';

import Video from 'components/Video/Video';
import Social from 'components/Social/Social';

import usFrame from 'assets/us.gif';
import showStripe from 'assets/showStripe.svg';
import showStripeAlt from 'assets/showStripeAlt.svg';

import video from 'assets/skills/video.svg';
import brand from 'assets/skills/brand.svg';
import content from 'assets/skills/content.svg';
import graphics from 'assets/skills/graphics.svg';

import novartis from 'assets/clients/novartis.svg';
import TIpeople from 'assets/clients/TIpeople.svg';
import gulbenkian from 'assets/clients/gulbenkian.svg';
import rtp from 'assets/clients/rtp.svg';
import uniplaces from 'assets/clients/uniplaces.svg';
import SNS from 'assets/clients/SNS.svg';

import logo from 'assets/logo.svg';

import classes from './Us.module.scss';

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

const Us = ({ setModal }) => {
  const toAnimateWord = useRef();
  const isToAnimateWordVisible = useIsVisible(toAnimateWord);
  const [animatingWord, setAnimatingWord] = useState(false);

  const animateWord = useCallback(() => {
    if (animatingWord) {
      return;
    }
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
        mixedWord[index] = `<span class="${classnames(classes.letter)}">${
          initialWord[index]
        }</span>`;
        element.innerHTML = mixedWord.join('');
        if (index === mixedWord.length - 1) {
          setAnimatingWord(false);
        }
      }, delay * index + delay * 6);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toAnimateWord]);

  useEffect(() => {
    if (isToAnimateWordVisible && toAnimateWord) {
      animateWord(toAnimateWord.current);
    }
  }, [isToAnimateWordVisible, toAnimateWord, animateWord]);

  return (
    <>
      <Video
        soon={false}
        scroll={false}
        frame={usFrame}
        className={classes.video}
      />
      <section className={classes.we}>
        <div className={classes.wrapper}>
          <h1 className="title">Who we are</h1>
          <img src={showStripe} alt="line" className="line" />
          <p className="subtitle">Typical love story here!</p>
          <p className="description">
            Digital Animator meets Graphic Designer. She loves his moves, he
            loves her typography OCD. <strong>And bam!</strong> A match-made in
            digital heaven. Nine years of partnership later (both in life and at
            work) we've decided to bring our own bundle of joy into the world.
            <br />
            <strong>A freaking studio!</strong>
          </p>
          <p className="description">
            A new, exciting venture with the same unfaltering commitment, the
            same detail-oriented mindset, the same relentless elbow-grease we
            work into every project.
            <br />
            And most important of all...
          </p>
          <p className="description">
            The same mad creativity, now <strong>with a kick-ass team!</strong>
          </p>
        </div>
      </section>
      <section className={classes.what}>
        <div className={classes.wrapper}>
          <h1 className="title">So what we do?</h1>
          <img src={showStripeAlt} alt="line" className="line" />
          <p className="subtitle">
            We love to give shape to beautiful and meaningful stories.
          </p>
          <p className="description">
            Fast-moving trends require rock-solid core skills.{' '}
            <br />
            Our savoir-faire is broader than you may expect!
          </p>
        </div>
        <ul className={classes.services}>
          <li>
            <img className={classes.skill} src={video} alt="video" />
            <h1 className={classes.title}>Video</h1>
            <ul className={classes.list}>
              <li>2D &amp; 3D Animation</li>
              <li>App Tutorials</li>
              <li>Explainer Videos</li>
              <li>Commercials</li>
              <li>Title Sequences</li>
              <li>Manifesto Videos</li>
              <li>Live-Action Production</li>
              <li>Social Media</li>
              <li>Gifs</li>
            </ul>
          </li>
          <li>
            <img className={classes.skill} src={graphics} alt="graphics" />
            <h1 className={classes.title}>Graphics</h1>
            <ul className={classes.list}>
              <li>2D &amp; 3D Illustration</li>
              <li>Style Frames</li>
              <li>Storyboarding</li>
              <li>Infographics</li>
              <li>Iconography</li>
              <li>UI/UX</li>
              <li>Web Design</li>
              <li>App Design</li>
              <li>Wireframing</li>
            </ul>
          </li>
          <li>
            <img className={classes.skill} src={brand} alt="brand" />
            <h1 className={classes.title}>Brand</h1>
            <ul className={classes.list}>
              <li>Brand Strategy</li>
              <li>Brand Identity</li>
              <li>Content Strategy</li>
              <li>Logo &amp; ID Systems</li>
              <li>Logo Animation</li>
              <li>Brand Style Guides</li>
              <li>Collateral, Print &amp; Packaging</li>
            </ul>
          </li>
          <li>
            <img className={classes.skill} src={content} alt="content" />
            <h1 className={classes.title}>Content</h1>
            <ul className={classes.list}>
              <li>Script Development</li>
              <li>Storytelling</li>
              <li>UX Writing</li>
              <li>Copywriting</li>
              <li>Presentation Design</li>
              <li>Photography</li>
              <li>Creative Direction</li>
            </ul>
          </li>
        </ul>
      </section>
      <section className={classes.clients}>
        <div className={classes.wrapper}>
          <h1 className="title">Some selected clients</h1>
          <img src={showStripe} alt="line" className="line" />
          <p className="subtitle">Reach goals and keep rocking</p>
        </div>
        <ul className={classes.logos}>
          <li>
            <img width={173} src={novartis} alt="Novartis" />
          </li>
          <li>
            <img width={80} src={TIpeople} alt="TIPeople" />
          </li>
          <li>
            <img width={196} src={gulbenkian} alt="Gulbenkian" />
          </li>
          <li>
            <img width={217} src={rtp} alt="RTP" />
          </li>
          <li>
            <img width={126} src={uniplaces} alt="Uniplaces" />
          </li>
          <li>
            <img width={211} src={SNS} alt="SNS" />
          </li>
        </ul>
      </section>
      <section className={classes.workTogether}>
        <div className={classes.content}>
          <h1 className="title">Let's work together</h1>
          <img src={showStripe} alt="line" className="line" />
          <p className="subtitle">
            We're always thinking about the future of{' '}
            <span
              ref={toAnimateWord}
              className={classes.animation}
              onClick={(e) => animateWord()}
            >
              Animation
            </span>
          </p>
          <button
            className="cta"
            onClick={() => {
              setModal(true);
            }}
          >
            Let's Talk
          </button>
        </div>
        <Social
          inverted
          className={classes.social}
          itemClassName={classes.socialItem}
        />
      </section>
      <footer>
        <img className={classes.logo} src={logo} alt="logo" />
        <span>
          &copy; Itsanashow Creative Studio, Lda 2020. All rights reserved.
        </span>
      </footer>
    </>
  );
};

export default Us;
