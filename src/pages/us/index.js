import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Slider from "react-slick";
import classnames from "classnames";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Lottie from "react-lottie-player";
import { InView } from "react-intersection-observer";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import Markdown from "src/components/Markdown/Markdown";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Instagram from "src/components/Instagram/Instagram";
import Testimonials from "src/components/Testimonials/Testimonials";

import motion from "src/assets/skills/motion.json";
import graphics from "src/assets/skills/graphics.json";
import brand from "src/assets/skills/brand.json";

import classes from "./styles.module.scss";

const Us = () => {
  const { setCursorType, scrollElement } = useContext(AppContext);
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

  const scrollRef = useRef();

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

  const whatItem1 = useRef();
  const whatItem2 = useRef();
  const whatItem3 = useRef();

  const [whatCentered, setWhatCentered] = useState([false, false, false]);

  const listenToScroll = () => {
    const what1Distance = Math.abs(
      whatItem1?.current?.getBoundingClientRect().top +
        whatItem1?.current?.offsetHeight / 2 -
        global.window?.innerHeight / 2
    );
    const what2Distance = Math.abs(
      whatItem2?.current?.getBoundingClientRect().top +
        whatItem2?.current?.offsetHeight / 2 -
        global.window?.innerHeight / 2
    );
    const what3Distance = Math.abs(
      whatItem3?.current?.getBoundingClientRect().top +
        whatItem3?.current?.offsetHeight / 2 -
        global.window?.innerHeight / 2
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
    if (scrollElement) {
      scrollElement.addEventListener("scroll", listenToScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", listenToScroll);
      }
    };
  }, [scrollElement]);

  return (
    <>
      <Head>
        <title>Itsanashow Studio | Know Us</title>
        <meta
          name="description"
          content='Meet the Itsanashow Creative Studio team, where we embrace challenges with creative hunger and a passion for overcoming obstacles. Our motto: "We love to give shape to beautiful and meaningful stories."'
        />
      </Head>
      <section className={classes.intro}>
        <div className={classnames("wrapper", classes.text)}>
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
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
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
            <AnimatedText>What we do</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={150}>
              We shape your ideas into beautiful and meaningful stories.
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
              <p className={classes.name}>Strategy</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  Crafting your standout vision to make a lasting mark in your
                  customers&apos; lives - that&apos;s our gig!
                </p>
                <p className={classes.tags}>
                  Creative Direction • Branding • Scriptwriting • Tone of Voice
                  • Copywriting
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
              <p className={classes.name}>Visuals</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  Designing eye-catching visuals and efficient systems that
                  speak volumes to both your team and the wider world, all on a
                  grand scale!
                </p>
                <p className={classes.tags}>
                  Visual Identity • Illustration • Graphic Design • Infographics
                  • Photo &amp; Video
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
              <p className={classes.name}>Experience</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  Unleashing imaginative strategies and dynamic experiences,
                  ensuring your users interact with your vision in the real
                  world and build positive engagement.
                </p>
                <p className={classes.tags}>
                  Animation &amp; Motion Graphics • Web Design &amp; Development
                  • UI Animation • Interactive Interfaces & AR • Campaigns
                </p>
              </div>
            </li>
          </ul>
          <div className={classes.ctaWrapper}>
            <Link
              href="/work"
              className={classes.cta}
              onMouseEnter={() => {
                setCursorType("bigger");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
            >
              Know our work
            </Link>
          </div>
        </div>
      </section>
      <Testimonials />
      <Instagram />
    </>
  );
};

export default Us;
