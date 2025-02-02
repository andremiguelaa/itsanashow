import React, { useMemo, useRef, useContext, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import classnames from "classnames";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./styles.module.scss";

const CATEGORIES = [
  "Branding",
  "Animation",
  "Character-driven",
  "Illustration",
  "Graphic Design",
  "Webdesign",
];

const Work = () => {
  const { setCursorType } = useContext(AppContext);

  const scrollRef = useRef();

  const { data: worksData } = useRequest({
    url: "works-page?populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BTags%5D%5Bpopulate%5D=*&populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BTeaser%5D%5Bpopulate%5D=*&populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BCategories%5D%5Bpopulate%5D=*",
    method: "GET",
  });

  const [category, setCategory] = useState();
  const [filterOpen, setFilterOpen] = useState(false);

  const works = useMemo(() => {
    let worksTemp = [];
    if (worksData?.data?.attributes?.Works?.length > 0) {
      worksTemp = worksData.data.attributes.Works.map(
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
                  Categories: { data: Categories },
                },
              },
            ],
          },
        }) => ({
          id,
          Title,
          Slug,
          Image,
          Categories: Categories.map(({ attributes: { Text } }) => Text),
        })
      );
    }
    if (category) {
      worksTemp = worksTemp.filter((work) =>
        work.Categories.includes(category)
      );
    }
    return worksTemp;
  }, [worksData, category]);

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
          <p className={classes.lead}>
            <AnimatedText>Our work</AnimatedText>
          </p>
          <p className={classes.description}>
            <AnimatedText delay={100}>
              Elevate your brand through powerful storytelling
            </AnimatedText>
          </p>
        </div>
        <div className="wrapper">
          <button
            className={classnames(classes.mobileFilter, {
              [classes.open]: filterOpen,
            })}
            onClick={() => setFilterOpen((prev) => !prev)}
            onMouseEnter={() => {
              setCursorType("bigger");
            }}
            onMouseLeave={() => {
              setCursorType("default");
            }}
          >
            {category || "All"}
          </button>
          <div
            className={classnames(classes.categories, {
              [classes.open]: filterOpen,
            })}
          >
            <button
              className={classnames({
                [classes.selected]: !category,
              })}
              onClick={() => {
                setCategory();
                setFilterOpen(false);
              }}
              onMouseEnter={() => {
                setCursorType("bigger");
              }}
              onMouseLeave={() => {
                setCursorType("default");
              }}
            >
              All
            </button>
            {CATEGORIES.map((item) => (
              <button
                className={classnames({
                  [classes.selected]: category === item,
                })}
                key={item}
                onClick={() => {
                  setCategory(item);
                  setFilterOpen(false);
                }}
                onMouseEnter={() => {
                  setCursorType("bigger");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div ref={scrollRef} style={{ position: "absolute", top: "100vh" }} />
      </section>
      {works.length > 0 && (
        <section className={classes.works}>
          <div
            ref={scrollWorksRef}
            style={{ position: "absolute", top: "100vh" }}
          />
          <ParallaxProvider>
            <ul className={classes.list}>
              {works.map(({ id, Title, Slug, Image, Categories }, index) => (
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
                        {Categories.length > 0 && (
                          <p className={classes.tags}>
                            {Categories.join(", ")}
                          </p>
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
    </>
  );
};

export default Work;
