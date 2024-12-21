import React, { useMemo, useRef, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import classnames from "classnames";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import AnimatedText from "src/components/AnimatedText/AnimatedText";
import WorkTogether from "src/components/WorkTogether/WorkTogether";

import classes from "./styles.module.scss";

const Work = () => {
  const { setCursorType, scrollElement } = useContext(AppContext);

  const scrollRef = useRef();

  const { data: worksData } = useRequest({
    url: "works-page?populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BTags%5D%5Bpopulate%5D=*&populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BTeaser%5D%5Bpopulate%5D=*",
    method: "GET",
  });

  const works = useMemo(() => {
    if (worksData?.data?.attributes?.Works?.length > 0) {
      return worksData.data.attributes.Works.map(
        ({
          work: {
            data: [
              {
                id,
                attributes: {
                  Title,
                  Slug,
                  Teaser: {
                    data: {
                      attributes: { url: Image },
                    },
                  },
                  Tags: { data: Tags },
                },
              },
            ],
          },
        }) => ({
          id,
          Title,
          Slug,
          Image,
          Tags: Tags.map(({ attributes: { Text } }) => Text),
        })
      );
    }
    return [];
  }, [worksData]);

  const scrollWorksRef = useRef();

  return (
    <>
      <Head>
        <title>Itsanashow Studio | Our Work</title>
        <meta
          name="description"
          content="Explore our world of animation, design, and user experience. At Itsanashow Creative Studio, we specialize in storytelling and crafting visual solutions for tech and software companies. Let the fun begin!"
        />
      </Head>
      <section className={classes.intro}>
        <div className={classnames("wrapper", classes.text)}>
          <p className={classes.description}>
            <AnimatedText>
              We believe we can help guide you into a world-building, engaging
              narrative.
            </AnimatedText>
          </p>
          <p className={classes.lead}>
            <AnimatedText delay={600}>Let the show begin!</AnimatedText>
          </p>
        </div>
        <div ref={scrollRef} style={{ position: "absolute", top: "100vh" }} />
      </section>
      {works.length > 0 && (
        <section className={classes.works}>
          <div
            ref={scrollWorksRef}
            style={{ position: "absolute", top: "100vh" }}
          />
          <ParallaxProvider scrollContainer={scrollElement}>
            <ul className={classes.list}>
              {works.map(({ id, Title, Slug, Image, Tags }, index) => (
                <li className={classes.item} key={id}>
                  <Link
                    href={`/work/${Slug}`}
                    onMouseEnter={() => {
                      setCursorType("view");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    <Parallax
                      translateY={[
                        0,
                        global.window?.innerWidth >= 768 && index % 2 === 1
                          ? -20
                          : 0,
                      ]}
                      targetElement={scrollRef.current}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${Image}`}
                        alt={Title}
                      />
                      <div className={classes.overlay} />
                      <div className={classes.text}>
                        <p className={classes.name}>{Title}</p>
                        {Tags.length > 0 && (
                          <p className={classes.tags}>{Tags.join(", ")}</p>
                        )}
                      </div>
                    </Parallax>
                  </Link>
                </li>
              ))}
            </ul>
          </ParallaxProvider>
        </section>
      )}
      <WorkTogether />
    </>
  );
};

export default Work;
