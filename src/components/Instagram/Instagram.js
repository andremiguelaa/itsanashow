import React, { useState, useContext } from 'react';
import Slider from 'react-slick';

import AppContext from 'src/AppContext';
import useRequest from 'src/utils/useRequest';
import AnimatedText from 'src/components/AnimatedText/AnimatedText';

import classes from './Instagram.module.scss';

const Instagram = () => {
  const { setCursorType } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    centerMode: false,
    variableWidth: true,
    touchThreshold: 100,
    beforeChange: (_, next) => {
      setCurrentSlide(next);
    },
  };

  const { data } = useRequest({
    url: 'instagram',
    method: 'GET',
  });

  const postToShow = data?.slice(0, 10);

  return (
    <>
      {data && (
        <section className={classes.instagram}>
          <div className="wrapper">
            <div className={classes.instagramContent}>
              <header className={classes.header}>
                <div>
                  <p className={classes.lead}>
                    <AnimatedText>Follow the fun</AnimatedText>
                  </p>
                  <p className={classes.description}>
                    <AnimatedText delay={250}>
                      Enter the Insta-Verse
                    </AnimatedText>
                  </p>
                </div>
                <div className={classes.scrollStatus}>
                  <div
                    className={classes.scrollStatusBar}
                    style={{
                      width: `${100 / postToShow.length}%`,
                      transform: `translateX(${currentSlide * 100}%)`,
                    }}
                  />
                </div>
              </header>
              <div className={classes.list}>
                <div
                  onMouseEnter={() => {
                    setCursorType('drag');
                  }}
                  onMouseLeave={() => {
                    setCursorType('default');
                  }}
                  onMouseDown={() => {
                    setCursorType('dragging');
                  }}
                  onMouseUp={() => {
                    setCursorType('drag');
                  }}
                >
                  <Slider {...settings}>
                    {postToShow.map(
                      ({
                        id,
                        caption,
                        media_url,
                        media_type,
                        thumbnail_url,
                      }) => (
                        <div key={id}>
                          <div className={classes.item}>
                            {media_type === 'VIDEO' && (
                              <img src={thumbnail_url} alt={caption} />
                            )}
                            {media_type !== 'VIDEO' && (
                              <img src={media_url} alt={caption} />
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </Slider>
                </div>
              </div>
              <div className={classes.linkWrapper}>
                <a
                  className={classes.link}
                  href="https://www.instagram.com/itsanashow.studio/"
                  rel="noreferrer"
                  target="_blank"
                  onMouseEnter={() => {
                    setCursorType('bigger');
                  }}
                  onMouseLeave={() => {
                    setCursorType('default');
                  }}
                >
                  @itsanashow.studio
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Instagram;
