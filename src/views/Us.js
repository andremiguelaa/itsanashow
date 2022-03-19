import React, { useRef, useState, useEffect } from 'react';
import { useIsVisible } from 'react-is-visible';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import teamHero from 'assets/teamHero.jpg';
import showStripe from 'assets/showStripe.svg';
import showStripeAlt from 'assets/showStripeAlt.svg';

import video from 'assets/skills/video.svg';
import brand from 'assets/skills/brand.svg';
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

const wordList = [
  'Animation',
  'UX/UI',
  'Branding',
  'Storytelling',
  'Video',
  'Illustration',
  'Filmmaking',
];

const Us = () => {
  const toAnimateWord = useRef();
  const isToAnimateWordVisible = useIsVisible(toAnimateWord);
  const [animatingWord, setAnimatingWord] = useState(false);
  const [nextAnimationWordIndex, setNextAnimationWordIndex] = useState(0);

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
    <>
      <section className={classes.we}>
        <img src={teamHero} alt="team hero" className={classes.teamHero} />
        <div className={classes.wrapper}>
          <h1 className="title">Who we are</h1>
          <img src={showStripe} alt="line" className="line" />
          <p className="subtitle">Catchy title</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
            luctus tortor, ut interdum nisi. Suspendisse non turpis in urna
            volutpat lobortis sed vitae sem. Nullam suscipit feugiat felis vel
            efficitur. Quisque eleifend scelerisque dolor eu bibendum. Vivamus
            blandit massa sed dolor iaculis, eu bibendum dui pretium.
          </p>
          <p className="description">
            Ut in sapien sit amet quam malesuada iaculis ut quis lorem. Fusce
            viverra pellentesque auctor. Etiam a gravida felis. Mauris
            porttitor, dolor in euismod egestas, augue risus suscipit massa, ut
            egestas sapien ante Aliquam erat volutpat. Nullam suscipit
            pellentesque justo, quis rhoncus purus sollicitudin eget. Integer a
            lacus vitae quam tristique suscipit in ut erat. Donec dictum commodo
            sapien ultrices tincidunt. Maecenas ultrices nisi sed mi viverra,
            vitae egestas mi condimentum. Integer ut odio et elit tincidunt
            lobortis
          </p>
        </div>
      </section>
      <section className={classes.what}>
        <div className={classes.wrapper}>
          <h1 className="title">What we do</h1>
          <img src={showStripeAlt} alt="line" className="line" />
          <p className="subtitle">
            We love to give shape to beautiful and meaningful stories.
          </p>
          <p className="description">
            Fast-moving trends require rock-solid core skills. <br />
            Our savoir-faire is broader than you may expect!
          </p>
        </div>
        <ul className={classes.services}>
          <li>
            <img className={classes.skill} src={video} alt="video" />
            <h1 className={classes.title}>Motion</h1>
            <ul className={classes.list}>
              <li>Motion Graphics</li>
              <li>2D &amp; 3D Animation</li>
              <li>Script Development</li>
              <li>App Tutorials</li>
              <li>Explainer Videos</li>
              <li>Commercials</li>
              <li>Title Sequences</li>
              <li>Manifesto Videos</li>
            </ul>
          </li>
          <li>
            <img className={classes.skill} src={graphics} alt="graphics" />
            <h1 className={classes.title}>Graphics</h1>
            <ul className={classes.list}>
              <li>Illustration</li>
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
              <li>Logo Design</li>
              <li>Identity Systems</li>
              <li>Tone of Voice</li>
              <li>Copywriting</li>
              <li>Brand Guidelines</li>
              <li>Brand Collateral</li>
              <li>Logo Animation</li>
              <li>Presentation Design</li>
            </ul>
          </li>
        </ul>
      </section>
      <section className={classes.clients}>
        <div className={classes.wrapper}>
          <h1 className="title">Some select clients</h1>
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </p>
          <div className={classes.quote}>
            <p>
              <strong>Request a quote for your project</strong>
            </p>
            <p>
              Fill out the form below and we'll get back to you with more
              information
            </p>
            <a
              className={classnames('cta', 'alt', classes.cta)}
              href="https://www.figma.com/file/a3zbwa7FUtsrL1oXhhYy5J/itsanashow_desktop_2022?node-id=0%3A1"
              target="_blank"
              rel="noreferrer"
            >
              Request a quote
            </a>
          </div>
        </div>
      </section>
      <footer>
        <Link to="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>
        <span>
          &copy; Itsanashow Creative Studio, Lda 2020. All rights reserved.
        </span>
      </footer>
    </>
  );
};

export default Us;
