import React, { useState, useMemo, useContext } from 'react';
import Slider from 'react-slick';

import AnimatedText from 'src/components/AnimatedText/AnimatedText';

import AppContext from 'src/AppContext';
import useRequest from 'src/utils/useRequest';
import Markdown from 'src/components/Markdown/Markdown';

import classes from './Testimonials.module.scss';

const Testimonials = () => {
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
    url: 'know-us-page?populate%5BTeam%5D%5Bpopulate%5D%5Bteam_member%5D%5Bpopulate%5D=*&populate%5BGallery%5D%5Bpopulate%5D%5Bteam_photo%5D%5Bpopulate%5D=*&populate%5BTestimonials%5D%5Bpopulate%5D=*',
    method: 'GET',
  });

  const testimonials = useMemo(() => {
    if (usData?.data?.attributes?.Testimonials?.length > 0) {
      return usData.data.attributes.Testimonials.map(
        ({
          id,
          testimonial: {
            data: {
              attributes: { Name, Role, Text },
            },
          },
        }) => ({ id, Name, Role, Text })
      );
    }
    return [];
  }, [usData]);

  return (
    <>
      {testimonials.length > 0 && (
        <section className={classes.testimonials}>
          <div className="wrapper">
            <p className={classes.lead}>
              <AnimatedText>This warms our hearts</AnimatedText>
            </p>
            <p className={classes.description}>
              <AnimatedText delay={250}>
                What our clients &amp; partners say about us
              </AnimatedText>
            </p>
          </div>
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
                {testimonials.map(({ id, Name, Role, Text }) => (
                  <div key={id}>
                    <div className={classes.item}>
                      <div className={classes.content}>
                        <p className={classes.text}>
                          <Markdown content={Text} />
                        </p>
                        <p className={classes.name}>{Name}</p>
                        <p className={classes.role}>{Role}</p>
                      </div>
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
                width: `${100 / testimonials.length}%`,
                transform: `translateX(${currentSlide * 100}%)`,
              }}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Testimonials;
