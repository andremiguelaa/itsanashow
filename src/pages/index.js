import React, { useMemo, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Spline from "@splinetool/react-spline";
import classnames from "classnames";

import { AppContext } from "src/AppContext";
import useRequest from "src/utils/useRequest";
import HomepageClients from "src/components/HomepageClients/HomepageClients";
import HomepageWork from "src/components/HomepageWork/HomepageWork";
import HomepageServices from "src/components/HomepageServices/HomepageServices";
import Testimonials from "src/components/Testimonials/Testimonials";
import HomepageTeam from "src/components/HomepageTeam/HomepageTeam";
import HomepageRelated from "src/components/HomepageRelated/HomepageRelated";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import Button from "src/components/Button/Button";
import arrow from "src/assets/buttons/arrowB.json";

import classes from "./styles.module.scss";

const Home = () => {
  const { setCursorType } = useContext(AppContext);

  const { data: homepageData } = useRequest({
    url: "homepage?populate%5BPortfolioHighlights%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D=*&populate%5BClients%5D%5Bpopulate%5D%5Bclient%5D%5Bpopulate%5D=*",
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

  const { data: articlesData } = useRequest({
    url: "articles",
    method: "GET",
  });

  const articles = articlesData?.data.slice(0, 3) || [];

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
        <div className={classes.spline}>
          <Spline scene="https://prod.spline.design/pmsrRpUXfZ0l8ACX/scene.splinecode" />
        </div>
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
        <div style={{ position: "absolute", top: "100vh" }} />
      </section>
      <HomepageClients clients={clients} />
      <HomepageWork portfolioHighlights={portfolioHighlights} />
      <HomepageServices />
      <Testimonials />
      <HomepageTeam />
      <HomepageRelated articles={articles} />
    </>
  );
};

export default Home;
