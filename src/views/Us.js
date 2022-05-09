import React, { useRef, useState, useEffect } from 'react';
import { useIsVisible } from 'react-is-visible';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useParallax } from 'react-scroll-parallax';

import useRequest from 'utils/useRequest';

import showStripe from 'assets/showStripe.svg';
import showStripeAlt from 'assets/showStripeAlt.svg';
import head from 'assets/head.svg';

import video from 'assets/skills/video.svg';
import brand from 'assets/skills/brand.svg';
import graphics from 'assets/skills/graphics.svg';

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

const currentYear = new Date().getFullYear();

const Us = () => {
  const { data: usData } = useRequest({
    url: 'know-us-page?populate%5BTeam%5D%5Bpopulate%5D%5Bteam_member%5D%5Bpopulate%5D=*&populate%5BGallery%5D%5Bpopulate%5D%5Bteam_photo%5D%5Bpopulate%5D=*&populate%5BTestimonials%5D%5Bpopulate%5D=*',
    method: 'GET',
  });

  console.log(usData);

  const [headWeScared, setHeadWeScared] = useState(false);
  const scaredHeadTimeout = useRef();

  const toAnimateWord = useRef();
  const isToAnimateWordVisible = useIsVisible(toAnimateWord);
  const [animatingWord, setAnimatingWord] = useState(false);
  const [nextAnimationWordIndex, setNextAnimationWordIndex] = useState(0);

  const { ref: ball1ref } = useParallax({ speed: 10 });
  const { ref: ball2ref } = useParallax({ speed: 20 });
  const { ref: ball3ref } = useParallax({ speed: 30 });

  /*
  const { ref: workBall1ref } = useParallax({ speed: 10 });
  const { ref: workBall2ref } = useParallax({ speed: 20 });
  const { ref: workBall3ref } = useParallax({ speed: 30 });
  */

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
      <section className={classes.intro}>
        <div className={classnames('wrapper', classes.text)}>
          <p className={classes.lead}>Who we are</p>
          <p className={classes.description}>
            <strong>Storytelling is life.</strong>
            <br />
            Embrace challenges with an open heart, creative hunger and a passion
            for overcoming obstacles as a team.
          </p>
        </div>
        <div
          className={classnames(classes.ball, classes.ball1)}
          ref={ball1ref}
        />
        <div
          className={classnames(classes.ball, classes.ball2)}
          ref={ball2ref}
        />
        <div
          className={classnames(classes.ball, classes.ball3)}
          ref={ball3ref}
        />
      </section>
      <section className={classes.team}>
        <ul></ul>
      </section>
      {/* 
      <div className={classes.usPage}>
        <section className={classes.hero}>
          <img src={teamHero} alt="team hero" className={classes.teamHero} />
          <img
            src={teamHero1}
            alt="team hero"
            className={classes.teamHeroMobile}
          />
          <img
            src={teamHero2}
            alt="team hero"
            className={classes.teamHeroMobile}
          />
        </section>
        <section className={classes.we}>
          <div className={classes.wrapper}>
            <h1 className="title">Who we are</h1>
            <img src={showStripe} alt="line" className="line" />
            <p className="subtitle">We are Storytellers!</p>
            <p className="description">
              We are a Studio with one vision —{' '}
              <strong>That storytelling is life.</strong>
              <b />
              Our purpose is to help you sculpt your story through meaningful
              and compelling content for all mediums. And we mean A-L-L! Our
              core team provides everything to kick off any project.
            </p>
            <p className="description">
              We use our collective experience as a badge of honor. We{' '}
              <strong>EMBRACE</strong> new challenges, we <strong>SOLVE</strong>{' '}
              storytelling problems, with an <strong>HUNGER</strong> for
              learning, we <strong>CREATE</strong> beautiful, emotion-driven
              projects that <strong>RESONATE</strong>
              with our audience and our client's goals and vision. To deliver.
              Always. An amazing experience that makes people talk about it
            </p>
            <p className="description">
              We believe we can help guide you into a world-building, engaging
              narrative. One that will bridge your needs with your wants.{' '}
              <strong>A hero's journey so to speak.</strong>
            </p>
            <p className="strong-description">
              <strong>Join the show! It's a wild one!</strong>
            </p>
          </div>
          <div
            className={classnames(classes.head)}
            onMouseEnter={() => {
              if (scaredHeadTimeout.current) {
                clearTimeout(scaredHeadTimeout.current);
                scaredHeadTimeout.current = null;
              }
              setHeadWeScared(true);
            }}
            onMouseLeave={() => {
              scaredHeadTimeout.current = setTimeout(() => {
                setHeadWeScared(false);
              }, 250);
            }}
          >
            <img
              className={classnames({ [classes.scared]: headWeScared })}
              src={head}
              alt="head"
            />
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
          <div
            className={classnames(classes.ball, classes.ball1)}
            ref={weBall1ref}
          />
          <div
            className={classnames(classes.ball, classes.ball2)}
            ref={weBall2ref}
          />
          <div
            className={classnames(classes.ball, classes.ball3)}
            ref={weBall3ref}
          />
          <div
            className={classnames(classes.ball, classes.ball4)}
            ref={weBall4ref}
          />
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
            <img src={showStripeAlt} alt="line" className="line" />
            <p className="subtitle">
              We're always thinking about the future of{' '}
              <span
                ref={toAnimateWord}
                className={classes.animation}
                onClick={() => animateWord()}
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
                href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
                target="_blank"
                rel="noreferrer"
              >
                <span aria-hidden="true">Request a quote</span>
                <span>Let's talk!</span>
              </a>
            </div>
          </div>
          <button
            className={classes.scroll}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          ></button>
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
        <footer>
          <div>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="logo" />
            </Link>
            <span className={classes.copyright}>
              &copy; Itsanashow Creative Studio, Lda {currentYear}. All rights
              reserved.
            </span>
          </div>
          <div className={classes.links}>
            <div>
              <Link to="/" className={classes.link}>
                home
              </Link>
            </div>
            <div>
              <Link
                to="/us"
                className={classnames(classes.link, classes.active)}
              >
                know us
              </Link>
            </div>
            <div>
              <a
                className={classnames('cta', classes.cta)}
                href="https://itsanashow.surveysparrow.com/s/contact-form/tt-05a01e"
                target="_blank"
                rel="noreferrer"
              >
                Request a quote
              </a>
            </div>
          </div>
        </footer>
      </div>
      */}
    </>
  );
};

export default Us;
