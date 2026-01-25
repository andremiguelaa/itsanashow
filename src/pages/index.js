import React, { useMemo } from "react";
import Head from "next/head";
import classnames from "classnames";

import useRequest from "src/utils/useRequest";
import HomepageClients from "src/components/HomepageClients/HomepageClients";
import HomepageWork from "src/components/HomepageWork/HomepageWork";
import HomepageServices from "src/components/HomepageServices/HomepageServices";
import Testimonials from "src/components/Testimonials/Testimonials";
import HomepageTeam from "src/components/HomepageTeam/HomepageTeam";
import FAQs from "src/components/FAQs/FAQs";
import HomepageRelated from "src/components/HomepageRelated/HomepageRelated";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Button from "src/components/Button/Button";

import reel from "../assets/reel.webm";
import reelMobile from "../assets/reel_mobile.webm";

import classes from "./styles.module.scss";

const Home = () => {
  const { data: homepageData } = useRequest({
    url: "homepage?populate%5BPortfolioHighlights%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D=*&populate%5BClients%5D%5Bpopulate%5D%5Bclient%5D%5Bpopulate%5D=*&populate%5BFAQs%5D%5Bpopulate%5D%5Bfaq%5D%5Bpopulate%5D=*",
    method: "GET",
  });

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
                Categories: { data: Tags },
              },
            },
          },
        }) => ({
          id,
          Title,
          Image,
          Tags: Tags.map(({ attributes: { Text } }) => Text),
        }),
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
        }),
      );
    }
    return [];
  }, [homepageData]);

  const faqs = useMemo(() => {
    if (homepageData?.data?.attributes?.FAQs?.length > 0) {
      return homepageData.data.attributes.FAQs.map(
        ({
          faq: {
            data: {
              id,
              attributes: { Question, Answer },
            },
          },
        }) => ({
          id,
          question: Question,
          answer: Answer,
        }),
      );
    }
    return [];
  }, [homepageData]);

  const { data: articlesData } = useRequest({
    url: "articles",
    method: "GET",
  });

  const articles = useMemo(
    () => articlesData?.data.sort(() => 0.5 - Math.random()).slice(0, 3) || [],
    [articlesData],
  );

  return (
    <>
      <Head>
        <title>Itsanashow Studio</title>
        <meta
          name="description"
          content="Itsanashow Studio is an indie creative powerhouse specializing in animation, branding, and web design. For fearless brands who dare to make an impact."
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
            <Button text="See Our Magic in Action" />
          </div>
        </div>
        <div className={classnames("wrapper", classes.video)}>
          <video autoPlay loop muted playsInline>
            <source
              src={reelMobile}
              type="video/webm"
              media="(max-width: 767px)"
            ></source>
            <source
              src={reel}
              type="video/webm"
              media="(min-width: 768px)"
            ></source>
          </video>
        </div>
      </section>
      <HomepageClients clients={clients} />
      <HomepageWork portfolioHighlights={portfolioHighlights} />
      <HomepageServices />
      <Testimonials />
      <HomepageTeam />
      <FAQs faqs={faqs} />
      <HomepageRelated articles={articles} />
    </>
  );
};

export default Home;
