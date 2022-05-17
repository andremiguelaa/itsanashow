import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useParallax } from 'react-scroll-parallax';
import Marquee from 'react-fast-marquee';
import Lottie from 'react-lottie-player';

import useRequest from 'utils/useRequest';

import video from 'assets/video.mp4';
import videoSound from 'assets/videoFull.mp4';
import head from 'assets/head.json';

import classes from './Home.module.scss';

const headFrameLimits = {
  start: 44,
  end: 61,
};

const Home = () => {
  const { ref: ball1ref } = useParallax({ speed: 10 });
  const { ref: ball2ref } = useParallax({ speed: 20 });
  const { ref: ball3ref } = useParallax({ speed: 30 });

  const [videoFull, setVideoFull] = useState(false);

  const headFrame = useRef(headFrameLimits.start);
  const headTimer = useRef();
  const [headFrameState, setHeadFrameState] = useState(headFrameLimits.start);

  const numberChange = (direction) => {
    clearInterval(headTimer.current);
    headTimer.current = setInterval(() => {
      if (direction === '+') {
        if (headFrame.current === headFrameLimits.end) {
          clearInterval(headTimer.current);
        } else {
          headFrame.current = headFrame.current + 1;
        }
      } else {
        if (headFrame.current === headFrameLimits.start) {
          clearInterval(headTimer.current);
        } else {
          headFrame.current = headFrame.current - 1;
        }
      }
      setHeadFrameState(headFrame.current);
    }, 40);
  };

  const { data: homepageData } = useRequest({
    url: 'homepage?populate%5BPortfolioHighlights%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D=*&populate%5BTags%5D%5Bpopulate%5D=*&populate%5BClients%5D%5Bpopulate%5D%5Bclient%5D%5Bpopulate%5D=*',
    method: 'GET',
  });

  const portfolioHighlights = useMemo(() => {
    if (homepageData?.data?.attributes?.PortfolioHighlights?.length > 0) {
      return homepageData.data.attributes.PortfolioHighlights.slice(0, 4).map(
        ({
          work: {
            data: {
              id,
              attributes: {
                Title,
                Teaser: {
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
  }, [homepageData]);

  const skills = useMemo(() => {
    if (homepageData?.data?.attributes?.Tags?.length > 0) {
      return homepageData.data.attributes.Tags.map(
        ({
          tag: {
            data: {
              id,
              attributes: { Text },
            },
          },
        }) => ({
          id,
          Text,
        })
      );
    }
    return [];
  }, [homepageData]);

  const clients = useMemo(() => {
    if (homepageData?.data?.attributes?.Clients?.length > 0) {
      return homepageData.data.attributes.Clients.map(
        ({
          client: {
            data: {
              id,
              attributes: {
                Name,
                Logo: {
                  data: {
                    attributes: { url: Logo },
                  },
                },
              },
            },
          },
        }) => ({
          id,
          Name,
          Logo,
        })
      );
    }
    return [];
  }, [homepageData]);

  return (
    <>
      <section className={classes.intro}>
        <div className={classnames('wrapper', classes.text)}>
          <p className={classes.lead}>We are Itsanashow</p>
          <p className={classes.description}>
            A creative studio who loves to shape beautiful and meaningful
            stories through motion, design and user experience.
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
      <section className={classes.video}>
        <div className={classes.overlay} onClick={() => setVideoFull(true)}>
          <p className={classes.callout}>Play our reel</p>
        </div>
        <video
          className={classes.videoMedia}
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
        {videoFull && (
          <div
            className={classes.fullScreenVideo}
            onClick={() => setVideoFull(false)}
          >
            <video
              className={classes.fullScreenVideoMedia}
              src={videoSound}
              autoPlay
              loop
              playsInline
            />
          </div>
        )}
      </section>
      <section className={classes.work}>
        <div className={classes.text}>
          <div className="wrapper">
            <p className={classes.lead}>Meet our work</p>
            <p className={classes.description}>
              We work closely with our clients and partners crafting visual
              solutions and collecting amazing experiences.
            </p>
          </div>
          <div
            className={classes.head}
            onMouseEnter={() => {
              numberChange('+');
            }}
            onMouseLeave={() => {
              numberChange('-');
            }}
          >
            <Lottie animationData={head} goTo={headFrameState} />
          </div>
        </div>
        {portfolioHighlights.length > 0 && (
          <ul className={classes.portfolioHighlights}>
            {portfolioHighlights.map((portfolioHighlight) => (
              <li key={portfolioHighlight.id}>
                <Link to={`/work/${portfolioHighlight.Title}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${portfolioHighlight.Image}`}
                    alt={portfolioHighlight.Title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className={classes.skills}>
        <div className="wrapper">
          <div className={classes.ctaWrapper}>
            <Link to="/work" className={classes.cta}>
              Wanna see more?
            </Link>
          </div>
          <p className={classes.lead}>So what we do?</p>
          <p className={classes.description}>
            Fast-moving trends require rock-solid core skills. Our savoir-faire
            is broader than you may expect!
          </p>
        </div>
        {skills.length > 0 && (
          <>
            <Marquee gradient={false} speed={50}>
              <ul className={classes.skillsList}>
                {skills.slice(0, skills.length / 2).map((skill) => (
                  <li key={skill.id}>{skill.Text}</li>
                ))}
              </ul>
            </Marquee>
            <Marquee gradient={false} speed={50} direction="right">
              <ul className={classes.skillsList}>
                {skills.slice(skills.length / 2).map((skill) => (
                  <li key={skill.id}>{skill.Text}</li>
                ))}
              </ul>
            </Marquee>
          </>
        )}
        <div className="wrapper">
          <div className={classes.ctaWrapper}>
            <Link to="/us" className={classes.cta}>
              Get to know us!
            </Link>
          </div>
        </div>
      </section>
      <section className={classes.clients}>
        <div className="wrapper">
          <p className={classes.lead}>Some happy clients and partners</p>
          <p className={classes.description}>
            Reach goals and keep rocking is our mojo!
          </p>
          {clients.length > 0 && (
            <ul className={classes.clientsList}>
              {clients.map((client) => (
                <li key={client.id}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${client.Logo}`}
                    alt={client.Name}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
