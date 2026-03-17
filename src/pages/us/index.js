import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import Head from "next/head";
import Slider from "react-slick";
import classnames from "classnames";
import Lottie from "react-lottie-player";
import { InView } from "react-intersection-observer";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import Markdown from "src/components/Markdown/Markdown";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Instagram from "src/components/Instagram/Instagram";
import Testimonials from "src/components/Testimonials/Testimonials";
import Button from "src/components/Button/Button";

import arrow from "src/assets/buttons/arrowG.json";
import arrowB from "src/assets/buttons/arrowB.json";
import motion from "src/assets/skills/motion.json";
import graphics from "src/assets/skills/graphics.json";
import brand from "src/assets/skills/brand.json";

import classes from "./styles.module.scss";

const Us = () => {
  const { setCursorType } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    touchThreshold: 100,
    beforeChange: (_, next) => {
      setCurrentSlide(next);
    },
  };

  const { data: usData } = useRequest({
    url: "know-us-page?populate%5BTeam%5D%5Bpopulate%5D%5Bteam_member%5D%5Bpopulate%5D=*&populate%5BGallery%5D%5Bpopulate%5D%5Bteam_photo%5D%5Bpopulate%5D=*&populate%5BTestimonials%5D%5Bpopulate%5D=*",
    method: "GET",
  });

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
        }) => ({ id, MainText, Name, Role, SecondaryText, Image }),
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
        }) => ({ id, Title, Image }),
      );
    }
    return [];
  }, [usData]);

  const whatItem1 = useRef();
  const whatItem2 = useRef();
  const whatItem3 = useRef();

  const [whatCentered, setWhatCentered] = useState([false, false, false]);

  const listenToScroll = () => {
    const what1Distance = Math.abs(
      whatItem1?.current?.getBoundingClientRect().top +
        whatItem1?.current?.offsetHeight / 2 -
        global.window?.innerHeight / 2,
    );
    const what2Distance = Math.abs(
      whatItem2?.current?.getBoundingClientRect().top +
        whatItem2?.current?.offsetHeight / 2 -
        global.window?.innerHeight / 2,
    );
    const what3Distance = Math.abs(
      whatItem3?.current?.getBoundingClientRect().top +
        whatItem3?.current?.offsetHeight / 2 -
        global.window?.innerHeight / 2,
    );
    const distanceThreshold = (global.window?.innerHeight * 2) / 3.5;
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
    global.document.addEventListener("scroll", listenToScroll);
    return () => {
      global.document.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Itsanashow Studio | About Us</title>
        <meta
          name="description"
          content="Your dedicated creative squad. Big enough to tackle any challenge, small enough to keep it personal. Strategy, animation, and design at heart."
        />
      </Head>
      <section className={classes.intro}>
        <div className={classnames("wrapper", classes.text)}>
          <p className={classes.lead}>
            <AnimatedText>Who we are</AnimatedText>
          </p>
          <p className={classes.description}>
            <strong>
              <AnimatedText delay={150}>Where strategy</AnimatedText>
              <br />
              <AnimatedText delay={250}>gets a soul.</AnimatedText>
            </strong>
            <AnimatedText delay={400}>
              If you&apos;re looking for a creative partner that starts with the
              right questions and ends with work that lasts, welcome.
            </AnimatedText>
          </p>
        </div>
      </section>
      <section className={classes.team}>
        <div className="wrapper">
          {teamMembers.length > 0 && (
            <>
              <ul className={classes.teamMembers}>
                {teamMembers.map(
                  (
                    { id, MainText, Name, Role, SecondaryText, Image },
                    index,
                  ) => (
                    <li key={id} className={classes.teamMember}>
                      <InView
                        onChange={(InView) => {
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
                              src={`${process.env.NEXT_PUBLIC_API_URL}${Image}`}
                              alt={Name}
                            />
                            <p className={classes.secondaryText}>
                              <Markdown content={SecondaryText} />
                            </p>
                          </div>
                        </div>
                      </InView>
                    </li>
                  ),
                )}
              </ul>
              <div className={classes.ctaWrapper}>
                <Button
                  text="Wanna join us?"
                  arrow={arrowB}
                  target="mailto:team@itsanashow.com"
                  blank
                />
              </div>
            </>
          )}
        </div>
      </section>
      {teamPhotos.length > 0 && (
        <section className={classes.gallery}>
          <div className={classes.teamPhotos}>
            <div
              onMouseEnter={() => {
                setCursorType("drag");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
              onMouseDown={() => {
                setCursorType("dragging");
              }}
              onMouseUp={() => {
                setCursorType("drag");
              }}
            >
              <Slider {...settings}>
                {teamPhotos.map(({ id, Title, Image }) => (
                  <div key={id}>
                    <div key={id} className={classes.teamPhoto}>
                      <img
                        className={classes.image}
                        src={`${process.env.NEXT_PUBLIC_API_URL}${Image}`}
                        alt={Title}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className={classes.scrollStatus}>
            <div
              className={classes.scrollStatusBar}
              style={{
                width: `${100 / teamPhotos.length}%`,
                transform: `translateX(${currentSlide * 100}%)`,
              }}
            />
          </div>
        </section>
      )}
      <section className={classes.what}>
        <div className={classnames("wrapper", classes.text)}>
          <p className={classes.lead}>
            <AnimatedText>How we work</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={150}>The thinking</AnimatedText>
            <br />
            <AnimatedText delay={250}>behind the making.</AnimatedText>
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
              <p className={classes.name}>Find the truth</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  Every brief hides a deeper communication challenge. We start
                  with your business goals and the questions that matter most:
                  what your audience currently believes and where they need to
                  go next. That answer shapes everything that follows.
                </p>
              </div>
            </li>
            <li
              className={classes.item}
              ref={whatItem2}
              style={{ opacity: `${whatCentered[1] * 100}%` }}
            >
              <div className={classes.img}>
                <Lottie loop animationData={graphics} play />
              </div>
              <p className={classes.name}>Build the story</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  Consistency is authority. We map the story logic of your
                  project before a single frame is designed, developing the
                  narrative arc, the visual language, and the motion system that
                  speaks with one voice across every platform. The making comes
                  later. The meaning comes first.
                </p>
              </div>
            </li>
            <li
              className={classes.item}
              ref={whatItem3}
              style={{ opacity: `${whatCentered[2] * 100}%` }}
            >
              <div className={classes.img}>
                <Lottie loop animationData={brand} play />
              </div>
              <p className={classes.name}>Make it land</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  We work as an extension of your team, not just a vendor. Every
                  visual decision: pacing, colour, movement, sound. Each one
                  made in service of a clear idea. Not to impress, but to
                  connect. This is where craft and strategy become the same
                  thing.
                </p>
              </div>
            </li>
          </ul>
          <div className={classes.ctaWrapper}>
            <div className={classes.cta}>
              <Button
                text="Let’s get started!"
                arrow={arrow}
                target="/contacts"
              />
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <Instagram />
    </>
  );
};

export default Us;
