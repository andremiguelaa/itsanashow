import React, { useRef, useState, useMemo, useContext } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import AnimatedText from 'components/AnimatedText/AnimatedText';

import AppContext from 'AppContext';
import useRequest from 'utils/useRequest';
import Markdown from 'components/Markdown/Markdown';

import Head from 'components/Head/Head';

import classes from './Testimonials.module.scss';

const Testimonials = () => {
  const { setCursorType } = useContext(AppContext);

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

  const testimonialGalleryContainer = useRef();
  const [testimonialGalleryScrollStatus, setTestimonialGalleryScrollStatus] =
    useState(0);
  const testimonialGalleryViewPercentage = testimonialGalleryContainer?.current
    ? document.documentElement.clientWidth /
      testimonialGalleryContainer.current.scrollWidth
    : 0;

  return (
    <>
      {testimonials.length > 0 && (
        <section className={classes.testimonials}>
          <Head className={classes.head} />
          <div className="wrapper">
            <p className={classes.lead}>
              <AnimatedText>We’re so proud of this!</AnimatedText>
            </p>
            <p className={classes.description}>
              <AnimatedText delay={250}>
                What our clients &amp; partners say about us
              </AnimatedText>
            </p>
          </div>
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
            <ScrollContainer
              innerRef={testimonialGalleryContainer}
              onScroll={() => {
                if (testimonialGalleryContainer.current) {
                  setTestimonialGalleryScrollStatus(
                    testimonialGalleryContainer.current.scrollLeft /
                      (testimonialGalleryContainer.current.scrollWidth -
                        document.documentElement.clientWidth)
                  );
                }
              }}
            >
              <ul className={classes.list}>
                {testimonials.map(({ id, Name, Role, Text }) => (
                  <li key={id} className={classes.item}>
                    <div className={classes.content}>
                      <p className={classes.text}>
                        <Markdown content={Text} />
                      </p>
                      <p className={classes.name}>{Name}</p>
                      <p className={classes.role}>{Role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollContainer>

            <div className={classes.scrollStatus}>
              <div
                className={classes.scrollStatusPusher}
                style={{ width: `${testimonialGalleryScrollStatus * 100}%` }}
              />
              <div
                className={classes.scrollStatusBar}
                style={{ width: `${testimonialGalleryViewPercentage * 100}%` }}
              />
              <div
                className={classes.scrollStatusPusher}
                style={{
                  width: `${(1 - testimonialGalleryScrollStatus) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Testimonials;
