import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
import classnames from 'classnames';
import { useParallax, Parallax } from 'react-scroll-parallax';

import useRequest from 'utils/useRequest';
import Markdown from 'components/Markdown/Markdown';

import video from 'assets/skills/video.svg';
import graphics from 'assets/skills/graphics.svg';
import brand from 'assets/skills/brand.svg';

import head from 'assets/head.svg';

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
  const { data: usData } = useRequest({
    url: 'know-us-page?populate%5BTeam%5D%5Bpopulate%5D%5Bteam_member%5D%5Bpopulate%5D=*&populate%5BGallery%5D%5Bpopulate%5D%5Bteam_photo%5D%5Bpopulate%5D=*&populate%5BTestimonials%5D%5Bpopulate%5D=*',
    method: 'GET',
  });

  const { ref: ball1ref } = useParallax({ speed: 10 });
  const { ref: ball2ref } = useParallax({ speed: 20 });
  const { ref: ball3ref } = useParallax({ speed: 30 });

  const teamMembers = useMemo(() => {
    if (usData?.data?.attributes?.Team?.length > 0) {
      return usData.data.attributes.Team.map(
        ({
          id,
          team_member: {
            data: {
              attributes: {
                MainText,
                Name,
                Role,
                SecondaryText,
                Photo: {
                  data: {
                    attributes: { url: Image },
                  },
                },
              },
            },
          },
        }) => ({ id, MainText, Name, Role, SecondaryText, Image })
      );
    }
    return [];
  }, [usData]);

  const teamPhotos = useMemo(() => {
    if (usData?.data?.attributes?.Gallery?.length > 0) {
      return usData.data.attributes.Gallery.map(
        ({
          id,
          team_photo: {
            data: {
              attributes: {
                Title,
                Photo: {
                  data: {
                    attributes: { url: Image },
                  },
                },
              },
            },
          },
        }) => ({ id, Title, Image })
      );
    }
    return [];
  }, [usData]);

  const galleryContainer = useRef();
  const [galleryScrollStatus, setGalleryScrollStatus] = useState(0);
  const galleryViewPercentage = galleryContainer?.current
    ? document.documentElement.clientWidth /
      galleryContainer.current.scrollWidth
    : 0;

  const { ref: weBall1ref } = useParallax({ speed: 10 });
  const { ref: weBall2ref } = useParallax({ speed: 20 });

  const whatItem1 = useRef();
  const whatItem2 = useRef();
  const whatItem3 = useRef();

  const [whatCentered, setWhatCentered] = useState([false, false, false]);

  const listenToScroll = () => {
    const what1Distance = Math.abs(
      whatItem1?.current?.getBoundingClientRect().top +
        whatItem1?.current?.offsetHeight / 2 -
        window.innerHeight / 2
    );
    const what2Distance = Math.abs(
      whatItem2?.current?.getBoundingClientRect().top +
        whatItem2?.current?.offsetHeight / 2 -
        window.innerHeight / 2
    );
    const what3Distance = Math.abs(
      whatItem3?.current?.getBoundingClientRect().top +
        whatItem3?.current?.offsetHeight / 2 -
        window.innerHeight / 2
    );
    const distanceThreshold = window.innerHeight * 2/3;
    setWhatCentered([
      what1Distance < distanceThreshold
        ? (distanceThreshold - what1Distance) / distanceThreshold
        : 0,
      what2Distance < distanceThreshold
        ? (distanceThreshold - what2Distance) / distanceThreshold
        : 0,
      what3Distance < distanceThreshold
        ? (distanceThreshold - what3Distance) / distanceThreshold
        : 0,
    ]);
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  /*
  const [headWeScared, setHeadWeScared] = useState(false);
  const scaredHeadTimeout = useRef();

  const toAnimateWord = useRef();
  const isToAnimateWordVisible = useIsVisible(toAnimateWord);
  const [animatingWord, setAnimatingWord] = useState(false);
  const [nextAnimationWordIndex, setNextAnimationWordIndex] = useState(0);

  const { ref: workBall1ref } = useParallax({ speed: 10 });
  const { ref: workBall2ref } = useParallax({ speed: 20 });
  const { ref: workBall3ref } = useParallax({ speed: 30 });

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
  */

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
      {teamMembers.length > 0 && (
        <section className={classes.team}>
          <div className="wrapper">
            <ul className={classes.teamMembers}>
              {teamMembers.map(
                ({ id, MainText, Name, Role, SecondaryText, Image }, index) => (
                  <li key={id} className={classes.teamMember}>
                    <Parallax
                      translateY={[0, -(Math.ceil((index + 1) / 2) * 20)]}
                    >
                      <p className={classes.role}>{Role}</p>
                      <p className={classes.name}>{Name}</p>
                      <p className={classes.mainText}>
                        <Markdown content={MainText} />
                      </p>
                    </Parallax>
                    <div className={classes.aside}>
                      <img
                        className={classes.image}
                        src={`${process.env.REACT_APP_API_URL}${Image}`}
                        alt={Name}
                      />
                      <p className={classes.secondaryText}>
                        <Markdown content={SecondaryText} />
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className={classes.ctaWrapper}>
              <a
                target="_blank"
                rel="noreferrer"
                href="mailto:hello@itsanashow.com"
                className={classes.cta}
              >
                Wanna join us?
              </a>
            </div>
          </div>
        </section>
      )}
      {teamPhotos.length > 0 && (
        <section className={classes.gallery}>
          <ScrollContainer
            innerRef={galleryContainer}
            onScroll={() => {
              if (galleryContainer.current) {
                setGalleryScrollStatus(
                  galleryContainer.current.scrollLeft /
                    (galleryContainer.current.scrollWidth -
                      document.documentElement.clientWidth)
                );
              }
            }}
          >
            <ul className={classes.teamPhotos}>
              {teamPhotos.map(({ id, Title, Image }) => (
                <li key={id} className={classes.teamPhoto}>
                  <img
                    className={classes.image}
                    src={`${process.env.REACT_APP_API_URL}${Image}`}
                    alt={Title}
                  />
                </li>
              ))}
            </ul>
          </ScrollContainer>
          <div className={classes.scrollStatus}>
            <div
              className={classes.scrollStatusPusher}
              style={{ width: `${galleryScrollStatus * 100}%` }}
            />
            <div
              className={classes.scrollStatusBar}
              style={{ width: `${galleryViewPercentage * 100}%` }}
            />
            <div
              className={classes.scrollStatusPusher}
              style={{ width: `${(1 - galleryScrollStatus) * 100}%` }}
            />
          </div>
        </section>
      )}
      <section className={classes.what}>
        <div className={classnames('wrapper', classes.text)}>
          <p className={classes.lead}>What we do</p>
          <p className={classes.description}>
            We love to give shape to beautiful and meaningful stories.
          </p>
          <ul className={classes.list}>
            <li
              className={classes.item}
              ref={whatItem1}
              style={{ opacity: `${whatCentered[0] * 100}%` }}
            >
              <img src={video} alt="Motion" />
              <p className={classes.name}>Motion</p>
              <p className={classes.text}>
                Motion Graphics, 2D &amp; 3D Animation, Script Development, App
                Tutorials, Explainer Videos, Commercials, Title sequences,
                Manifesto videos
              </p>
            </li>
            <li
              className={classes.item}
              ref={whatItem2}
              style={{ opacity: `${whatCentered[1] * 100}%` }}
            >
              <img src={graphics} alt="Graphics" />
              <p className={classes.name}>Graphics</p>
              <p className={classes.text}>
                Illustration, Infographics, Iconography, UI/UX Web Design, App
                Design, Wireframing
              </p>
            </li>
            <li
              className={classes.item}
              ref={whatItem3}
              style={{ opacity: `${whatCentered[2] * 100}%` }}
            >
              <img src={brand} alt="Branding" />
              <p className={classes.name}>Branding</p>
              <p className={classes.text}>
                Logo Design, Identity Systems, Tone of voice Copywriting, Brand
                Guidelines, Brand Collateral Logo Animation, Presentation Design
              </p>
            </li>
          </ul>
          <div className={classes.ctaWrapper}>
            <Link to="/us" className={classes.cta}>
              Know our work
            </Link>
          </div>
        </div>
        <div
          className={classnames(classes.ball, classes.ball1)}
          ref={weBall1ref}
        />
        <div
          className={classnames(classes.ball, classes.ball2)}
          ref={weBall2ref}
        />
      </section>

      {/* 
      <div className={classes.usPage}>
        <section className={classes.we}>
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
      </div>
      */}
    </>
  );
};

export default Us;
