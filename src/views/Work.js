import React, { useMemo, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import AppContext from 'AppContext';
import useRequest from 'utils/useRequest';
import AnimatedText from 'components/AnimatedText/AnimatedText';
import WorkTogether from 'components/WorkTogether/WorkTogether';

import classes from './Work.module.scss';

const Work = () => {
  const { setCursorType, scrollElement } = useContext(AppContext);

  const scrollRef = useRef();

  const ball1ref = useRef();
  const ball2ref = useRef();
  const ball3ref = useRef();
  const ball4ref = useRef();

  const { data: worksData } = useRequest({
    url: 'works-page?populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BTags%5D%5Bpopulate%5D=*&populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D%5Bpopulate%5D%5BTeaser%5D%5Bpopulate%5D=*',
    method: 'GET',
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
          Image,
          Tags: Tags.map(({ attributes: { Text } }) => Text),
        })
      );
    }
    return [];
  }, [worksData]);

  const scrollWorksRef = useRef();

  const [worksLimit, setWorksLimit] = useState(6);

  return (
    <>
      <section className={classes.intro}>
        <div className={classnames('wrapper', classes.text)}>
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
          <Parallax
            translateY={[0, window.innerWidth >= 768 ? -300 : -150]}
            targetElement={scrollRef.current}
            className={classnames(classes.ball, classes.ball4)}
          >
            <div ref={ball4ref} />
          </Parallax>
        </ParallaxProvider>
      </section>
      {works.length > 0 && (
        <section className={classes.works}>
          <div ref={scrollWorksRef} style={{ position: 'absolute', top: '100vh' }} />
          <ParallaxProvider scrollContainer={scrollElement}>
            <ul className={classes.list}>
              {works.map(({ id, Title, Image, Tags }, index) => (
                <li
                  className={classnames(classes.item, {
                    [classes.visible]: worksLimit > index,
                  })}
                  key={id}
                >
                  <Link
                    to={{
                      pathname: `/work/${Title}`,
                      state: { origin: 'work' },
                    }}
                    onMouseEnter={() => {
                      setCursorType('view');
                    }}
                    onMouseLeave={() => {
                      setCursorType('default');
                    }}
                  >
                    <Parallax
                      translateY={[
                        0,
                        window.innerWidth >= 768 && index % 2 === 1 ? -20 : 0,
                      ]}
                      targetElement={scrollRef.current}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}${Image}`}
                        alt={Title}
                      />
                      <div className={classes.overlay} />
                      <div className={classes.text}>
                        <p className={classes.name}>{Title}</p>
                        {Tags.length > 0 && (
                          <p className={classes.tags}>{Tags.join(', ')}</p>
                        )}
                      </div>
                    </Parallax>
                  </Link>
                </li>
              ))}
            </ul>
          </ParallaxProvider>
          {worksLimit < works.length && (
            <div className={classes.seeMore}>
              <button
                className={classes.more}
                onClick={() => {
                  setWorksLimit((prev) => prev + 6);
                }}
                onMouseEnter={() => {
                  setCursorType('bigger');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                }}
              >
                Let me see more
              </button>
            </div>
          )}
        </section>
      )}
      <WorkTogether />
    </>
  );
};

export default Work;
