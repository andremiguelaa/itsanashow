import React, { useRef, useState, useEffect, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
import classnames from 'classnames';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Lottie from 'react-lottie-player';
import { InView } from 'react-intersection-observer';
import AnimatedText from 'components/AnimatedText/AnimatedText';

import AppContext from 'AppContext';
import useRequest from 'utils/useRequest';
import Markdown from 'components/Markdown/Markdown';
import WorkTogether from 'components/WorkTogether/WorkTogether';

import motion from 'assets/skills/motion.json';
import graphics from 'assets/skills/graphics.json';
import brand from 'assets/skills/brand.json';
import Head from 'components/Head/Head';

import classes from './Us.module.scss';

const Us = () => {
  const { setCursorType, scrollElement } = useContext(AppContext);

  const { data: usData } = useRequest({
    url: 'know-us-page?populate%5BTeam%5D%5Bpopulate%5D%5Bteam_member%5D%5Bpopulate%5D=*&populate%5BGallery%5D%5Bpopulate%5D%5Bteam_photo%5D%5Bpopulate%5D=*&populate%5BTestimonials%5D%5Bpopulate%5D=*',
    method: 'GET',
  });

  const scrollRef = useRef();

  const ball1ref = useRef();
  const ball2ref = useRef();
  const ball3ref = useRef();

  const [teamMemberVisibility, setTeamMemberVisibility] = useState({});

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

  const scrollWeRef = useRef();

  const weBall1ref = useRef();
  const weBall2ref = useRef();

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
    const distanceThreshold = (window.innerHeight * 2) / 3.5;
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
    if (scrollElement) {
      scrollElement.addEventListener('scroll', listenToScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', listenToScroll);
      }
    };
  }, [scrollElement]);

  const testimonials = useMemo(() => {
    if (usData?.data?.attributes?.Testimonials?.length > 0) {
      return usData.data.attributes.Testimonials.map(
        ({
          id,
          testimonial: {
            data: {
              attributes: { Name, Role, Text },
            },
          },
        }) => ({ id, Name, Role, Text })
      );
    }
    return [];
  }, [usData]);

  const testimonialGalleryContainer = useRef();
  const [testimonialGalleryScrollStatus, setTestimonialGalleryScrollStatus] =
    useState(0);
  const testimonialGalleryViewPercentage = testimonialGalleryContainer?.current
    ? document.documentElement.clientWidth /
      testimonialGalleryContainer.current.scrollWidth
    : 0;

  return (
    <>
      <section className={classes.intro}>
        <div className={classnames('wrapper', classes.text)}>
          <p className={classes.lead}>
            <AnimatedText>Who we are</AnimatedText>
          </p>
          <p className={classes.description}>
            <strong>
              <AnimatedText delay={150}>Storytelling is life.</AnimatedText>
            </strong>
            <br />
            <AnimatedText delay={300}>
              Embrace challenges with an open heart, creative hunger and a
              passion for overcoming obstacles as a team.
            </AnimatedText>
          </p>
        </div>
        <div ref={scrollRef} style={{ position: 'absolute', top: '100vh' }} />
        <ParallaxProvider scrollContainer={scrollElement}>
          <Parallax
            className={classnames(classes.ball, classes.ball1)}
            translateY={[0, window.innerWidth >= 768 ? -100 : -50]}
            targetElement={scrollRef.current}
          >
            <div ref={ball1ref} />
          </Parallax>
          <Parallax
            translateY={[0, window.innerWidth >= 768 ? -200 : -100]}
            targetElement={scrollRef.current}
            className={classnames(classes.ball, classes.ball2)}
          >
            <div ref={ball2ref} />
          </Parallax>
          <Parallax
            translateY={[0, window.innerWidth >= 768 ? -300 : -150]}
            targetElement={scrollRef.current}
            className={classnames(classes.ball, classes.ball3)}
          >
            <div ref={ball3ref} />
          </Parallax>
        </ParallaxProvider>
      </section>
      {teamMembers.length > 0 && (
        <section className={classes.team}>
          <div className="wrapper">
            <ul className={classes.teamMembers}>
              {teamMembers.map(
                ({ id, MainText, Name, Role, SecondaryText, Image }, index) => (
                  <li key={id} className={classes.teamMember}>
                    <InView
                      onChange={(InView) => {
                        console.log(InView);
                        setTeamMemberVisibility((prev) => ({
                          ...prev,
                          [id]: InView,
                        }));
                      }}
                    >
                      <div
                        className={classnames(classes.teamMemberContent, {
                          [classes.visible]: teamMemberVisibility[id],
                          [classes.delayIn]: index % 2 !== 0,
                        })}
                      >
                        <p className={classes.role}>{Role}</p>
                        <p className={classes.name}>{Name}</p>
                        <p className={classes.mainText}>
                          <Markdown content={MainText} />
                        </p>

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
                      </div>
                    </InView>
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
                onMouseEnter={() => {
                  setCursorType('bigger');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                }}
              >
                Wanna join us?
              </a>
            </div>
          </div>
        </section>
      )}
      {teamPhotos.length > 0 && (
        <section className={classes.gallery}>
          <div
            onMouseEnter={() => {
              setCursorType('drag');
            }}
            onMouseLeave={() => {
              setCursorType('default');
            }}
            onMouseDown={() => {
              setCursorType('dragging');
            }}
            onMouseUp={() => {
              setCursorType('drag');
            }}
          >
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
          </div>
        </section>
      )}
      <section className={classes.what}>
        <div className={classnames('wrapper', classes.text)}>
          <p className={classes.lead}>
            <AnimatedText>What we do</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={150}>
              We love to give shape to beautiful and meaningful stories.
            </AnimatedText>
          </p>
          <ul className={classes.list}>
            <li
              className={classes.item}
              ref={whatItem1}
              style={{ opacity: `${whatCentered[0] * 100}%` }}
            >
              <div className={classes.img}>
                <Lottie loop animationData={motion} play />
              </div>
              <p className={classes.name}>Animation</p>
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
              <div className={classes.img}>
                <Lottie loop animationData={graphics} play />
              </div>
              <p className={classes.name}>Graphics</p>
              <p className={classes.text}>
                Illustration, Infographics, Iconography, UI/UX, Web Design, App
                Design, Wireframing
              </p>
            </li>
            <li
              className={classes.item}
              ref={whatItem3}
              style={{ opacity: `${whatCentered[2] * 100}%` }}
            >
              <div className={classes.img}>
                <Lottie loop animationData={brand} play />
              </div>
              <p className={classes.name}>Branding</p>
              <p className={classes.text}>
                Logo Design, Identity Systems, Tone of voice, Copywriting, Brand
                Guidelines, Brand Collateral, Logo Animation, Presentation
                Design
              </p>
            </li>
          </ul>
          <div className={classes.ctaWrapper}>
            <Link
              to="/work"
              className={classes.cta}
              onMouseEnter={() => {
                setCursorType('bigger');
              }}
              onMouseLeave={() => {
                setCursorType('default');
              }}
            >
              Know our work
            </Link>
          </div>
        </div>
        <div ref={scrollWeRef} style={{ position: 'absolute', top: '50vh' }} />
        <ParallaxProvider scrollContainer={scrollElement}>
          <Parallax
            className={classnames(classes.ball, classes.ball1)}
            translateY={[0, window.innerWidth >= 768 ? -200 : -100]}
            targetElement={scrollWeRef.current}
          >
            <div ref={weBall1ref} />
          </Parallax>
          <Parallax
            className={classnames(classes.ball, classes.ball2)}
            translateY={[0, window.innerWidth >= 768 ? -200 : -100]}
            targetElement={scrollWeRef.current}
          >
            <div ref={weBall2ref} />
          </Parallax>
        </ParallaxProvider>
      </section>
      {testimonials.length > 0 && (
        <section className={classes.testimonials}>
          <Head className={classes.head} />
          <div className="wrapper">
            <p className={classes.lead}>
              <AnimatedText>We’re so proud of this!</AnimatedText>
            </p>
            <p className={classes.description}>
              <AnimatedText delay={250}>
                What our clients &amp; partners say about us
              </AnimatedText>
            </p>
          </div>
          <div
            onMouseEnter={() => {
              setCursorType('drag');
            }}
            onMouseLeave={() => {
              setCursorType('default');
            }}
            onMouseDown={() => {
              setCursorType('dragging');
            }}
            onMouseUp={() => {
              setCursorType('drag');
            }}
          >
            <ScrollContainer
              innerRef={testimonialGalleryContainer}
              onScroll={() => {
                if (testimonialGalleryContainer.current) {
                  setTestimonialGalleryScrollStatus(
                    testimonialGalleryContainer.current.scrollLeft /
                      (testimonialGalleryContainer.current.scrollWidth -
                        document.documentElement.clientWidth)
                  );
                }
              }}
            >
              <ul className={classes.list}>
                {testimonials.map(({ id, Name, Role, Text }) => (
                  <li key={id} className={classes.item}>
                    <div className={classes.content}>
                      <p className={classes.text}>
                        <Markdown content={Text} />
                      </p>
                      <p className={classes.name}>{Name}</p>
                      <p className={classes.role}>{Role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollContainer>

            <div className={classes.scrollStatus}>
              <div
                className={classes.scrollStatusPusher}
                style={{ width: `${testimonialGalleryScrollStatus * 100}%` }}
              />
              <div
                className={classes.scrollStatusBar}
                style={{ width: `${testimonialGalleryViewPercentage * 100}%` }}
              />
              <div
                className={classes.scrollStatusPusher}
                style={{
                  width: `${(1 - testimonialGalleryScrollStatus) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>
      )}
      <WorkTogether />
    </>
  );
};

export default Us;
