import React, { useState, useMemo, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import classnames from "classnames";
import Marquee from "react-fast-marquee";
import { InView } from "react-intersection-observer";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import DummyHead from "src/components/Head/Head";
import Button from "src/components/Button/Button";
import Testimonials from "src/components/Testimonials/Testimonials";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./styles.module.scss";

const Home = () => {
  const { setCursorType } = useContext(AppContext);

  const { data: homepageData } = useRequest({
    url: "homepage?populate%5BPortfolioHighlights%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D=*&populate%5BTags%5D%5Bpopulate%5D=*&populate%5BClients%5D%5Bpopulate%5D%5Bclient%5D%5Bpopulate%5D=*",
    method: "GET",
  });

  const [logosVisibility, setLogosVisibility] = useState({});

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
            <Button />
          </div>
        </div>
        <div style={{ position: "absolute", top: "100vh" }} />
      </section>
      <section className={classes.clients}>
        <div className="wrapper">
          <p className={classes.lead}>
            <AnimatedText>Some happy clients and partners</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={250}>
              Reach goals and keep rocking is our mojo!
            </AnimatedText>
          </p>
          {clients.length > 0 && (
            <ul className={classes.clientsList}>
              {clients.map((client) => (
                <InView
                  as="li"
                  key={client.id}
                  onChange={(InView) => {
                    if (InView) {
                      setLogosVisibility((prev) => ({
                        ...prev,
                        [client.id]: true,
                      }));
                    }
                  }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${client.Logo}`}
                    alt={client.Name}
                    className={classnames({
                      [classes.visible]: logosVisibility[client.id],
                    })}
                  />
                </InView>
              ))}
            </ul>
          )}
          <div className={classes.ctaWrapper}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.designrush.com/agency/profile/itsanashow-studio"
              className={classes.cta}
              onMouseEnter={() => {
                setCursorType("bigger");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
            >
              View our profile on DesignRush
            </a>
          </div>
        </div>
      </section>
      <section className={classes.work}>
        <div className={classes.mainText}>
          <div className="wrapper">
            <p className={classes.lead}>
              <AnimatedText>Check our work</AnimatedText>
            </p>
            <p className={classes.description}>
              <AnimatedText delay={150}>
                We work closely with our clients and partners crafting visual
                solutions and collecting amazing experiences.
              </AnimatedText>
            </p>
          </div>
          <DummyHead className={classes.head} />
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
                  <div className={classes.overlay} />
                  <div className={classes.text}>
                    <p className={classes.name}>{portfolioHighlight.Title}</p>
                    {portfolioHighlight.Tags.length > 0 && (
                      <p className={classes.tags}>
                        {portfolioHighlight.Tags.join(", ")}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
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
