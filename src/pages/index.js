import React, { useMemo, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import classnames from "classnames";
import Marquee from "react-fast-marquee";
import Slider from "react-slick";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import SeeOurMagicButton from "src/components/SeeOurMagicButton/SeeOurMagicButton";
import Testimonials from "src/components/Testimonials/Testimonials";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./styles.module.scss";

const Home = () => {
  const { setCursorType } = useContext(AppContext);

  const { data: homepageData } = useRequest({
    url: "homepage?populate%5BPortfolioHighlights%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D=*&populate%5BTags%5D%5Bpopulate%5D=*&populate%5BClients%5D%5Bpopulate%5D%5Bclient%5D%5Bpopulate%5D=*",
    method: "GET",
  });

  const logoSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    touchThreshold: 100,
  };

  const portfolioHighlights = useMemo(() => {
    if (homepageData?.data?.attributes?.PortfolioHighlights?.length > 0) {
      return homepageData.data.attributes.PortfolioHighlights.slice(0, 3).map(
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
                Tags: { data: Tags },
              },
            },
          },
        }) => ({
          id,
          Title,
          Image,
          Tags: Tags.map(({ attributes: { Text } }) => Text),
        })
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
      <Head>
        <title>Itsanashow Studio</title>
        <meta
          name="description"
          content="Welcome to Itsanashow Creative Studio! We're passionate about crafting beautiful and meaningful stories through animation, design, and user experience. Discover how we help tech and software companies enhance their outreach and establish leadership in their fields."
        />
      </Head>
      <section className={classes.intro}>
        <div className={classnames("wrapper", classes.text)}>
          <p className={classes.description}>
            <AnimatedText>Crafting stories that make brands shine</AnimatedText>
          </p>
          <p className={classes.lead}>
            <AnimatedText delay={300}>
              Animation, Branding & Web Design for Visionaries who dare to stand
              out
            </AnimatedText>
          </p>
          <div className={classes.button}>
            <SeeOurMagicButton />
          </div>
        </div>
        <div style={{ position: "absolute", top: "100vh" }} />
      </section>
      <section className={classes.clients}>
        <div className="wrapper">
          <p className={classes.lead}>
            <AnimatedText>Our Partners in Creativity</AnimatedText>
          </p>
        </div>
        {clients.length > 0 && (
          <ul className={classes.clientsList}>
            <Slider {...logoSliderSettings}>
              {clients.map((client) => (
                <li key={client.id}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${client.Logo}`}
                    alt={client.Name}
                  />
                </li>
              ))}
            </Slider>
          </ul>
        )}
      </section>
      <section className={classes.work}>
        <div className="wrapper">
          <div className={classes.mainText}>
            <p className={classes.lead}>
              <AnimatedText>Our work</AnimatedText>
            </p>
            <p className={classes.description}>
              <AnimatedText delay={100}>
                Visuals that dominate, inspire, and leave your competition
                jealous 
              </AnimatedText>
            </p>
          </div>
          {portfolioHighlights.length > 0 && (
            <ul className={classes.portfolioHighlights}>
              {portfolioHighlights.map((portfolioHighlight) => (
                <li key={portfolioHighlight.id}>
                  <Link
                    href={`/work/${portfolioHighlight.Title}`}
                    onMouseEnter={() => {
                      setCursorType("view");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${portfolioHighlight.Image}`}
                      alt={portfolioHighlight.Title}
                    />
                    <div className={classes.text}>
                      <p className={classes.name}>{portfolioHighlight.Title}</p>
                      {portfolioHighlight.Tags.length > 0 && (
                        <p className={classes.tags}>
                          {portfolioHighlight.Tags.join(", ")}
                        </p>
                      )}
                      <div className={classes.arrow} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className={classes.skills}>
        <div className="wrapper">
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
              Wanna see more?
            </Link>
          </div>
          <p className={classes.lead}>
            <AnimatedText>What we do</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={200}>
              Fast-moving trends require rock-solid core skills. Our
              savoir-faire is broader, with a proven track record.
            </AnimatedText>
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
            <Link
              href="/us"
              className={classes.cta}
              onMouseEnter={() => {
                setCursorType("bigger");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
            >
              Get to know us!
            </Link>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

export default Home;
