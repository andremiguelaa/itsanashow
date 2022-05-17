import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useParallax, Parallax } from 'react-scroll-parallax';
import isTouchDevice from 'is-touch-device';

import useRequest from 'utils/useRequest';
import WorkTogether from 'components/WorkTogether/WorkTogether';

import classes from './Work.module.scss';

const isTouch = isTouchDevice();

const Work = () => {
  const { ref: ball1ref } = useParallax({ speed: isTouch ? 5 : 15 });
  const { ref: ball2ref } = useParallax({ speed: isTouch ? 10 : 25 });
  const { ref: ball3ref } = useParallax({ speed: isTouch ? 15 : 35 });
  const { ref: ball4ref } = useParallax({ speed: isTouch ? 20 : 45 });

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

  const scrollRef = useRef();

  const [worksLimit, setWorksLimit] = useState(4);

  return (
    <>
      <section className={classes.intro}>
        <div className={classnames('wrapper', classes.text)}>
          <p className={classes.description}>
            We believe we can help guide you into a world-building, engaging
            narrative.
          </p>
          <p className={classes.lead}>Let the show begin!</p>
        </div>
        <div
          className={classnames(classes.ball, classes.ball1)}
          ref={ball1ref}
        />
        <div
          className={classnames(classes.ball, classes.ball2)}
          ref={ball2ref}
        />
        <div
          className={classnames(classes.ball, classes.ball3)}
          ref={ball3ref}
        />
        <div
          className={classnames(classes.ball, classes.ball4)}
          ref={ball4ref}
        />
      </section>
      {works.length > 0 && (
        <section className={classes.works}>
          <div
            ref={scrollRef}
            style={{ position: 'absolute', top: '100vh' }}
          ></div>
          <ul className={classes.list}>
            {works
              .slice(0, worksLimit)
              .map(({ id, Title, Image, Tags }, index) => (
                <li className={classes.item} key={id}>
                  <Link to={`/work/${Title}`}>
                    <Parallax
                      translateY={[
                        0,
                        window.innerHeight >= 768 && index % 2 === 1 ? -20 : 0,
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
          {worksLimit < works.length && (
            <div className={classes.seeMore}>
              <button
                className={classes.more}
                onClick={() => {
                  setWorksLimit((prev) => prev + 4);
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
