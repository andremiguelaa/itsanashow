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
              <AnimatedText delay={300}>
                Your dedicated creative squad
              </AnimatedText>
            </strong>
            <AnimatedText delay={700}>
              Searching for a pixel-perfect partner who crafts stunning
              narratives and makes the whole process a breeze?
            </AnimatedText>
            <br />
            <br />
            <b>
              <AnimatedText delay={2300}>
                You’ve found your perfect match!✨
              </AnimatedText>
            </b>
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
              <Button
                text="Wanna join us?"
                arrow={arrowB}
                target="mailto:hello@itsanashow.com"
                blank
              />
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
            <AnimatedText>Our creative process</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={300}>Tailored. Collaborative.</AnimatedText>
            <br />
            <AnimatedText delay={500}>Impactful.</AnimatedText>
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
              <p className={classes.name}>
                Rooted in
                <br /> Your Brand
              </p>
              <div className={classes.content}>
                <p className={classes.text}>
                  We’re more than creators; we’re your brand partners. We
                  uncover your brand’s essence and amplify it through impactful,
                  on-brand design and motion that aligns perfectly with your
                  goals.
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
              <p className={classes.name}>Impact with Consistency</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  Our visuals and animations embody your brand’s voice,
                  delivering cohesive designs across platforms. We create
                  seamless experiences that build trust and strengthen your
                  brand identity.
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
              <p className={classes.name}>Results-Driven Partnership</p>
              <div className={classes.content}>
                <p className={classes.text}>
                  We work hand-in-hand with your team to turn ideas into
                  impactful results. With precision and creativity, we bring
                  your vision to life as your brand’s dedicated creative squad.
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
