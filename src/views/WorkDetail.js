import React, { useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

import useRequest from 'utils/useRequest';
import Markdown from 'components/Markdown/Markdown';
import WorkTogether from 'components/WorkTogether/WorkTogether';

import behance from 'assets/behance.svg';

import classes from './WorkDetail.module.scss';

const WorkDetail = () => {
  const { name } = useParams();

  const {
    data: workData,
    loading,
    error,
  } = useRequest({
    url: `works?filters%5BTitle%5D%5B%24eq%5D=${name}&populate=*`,
    method: 'GET',
  });

  const {
    data: worksData,
    loading: loadingWorks,
    error: errorWorks,
  } = useRequest({
    url: 'works-page?populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D=*',
    method: 'GET',
  });

  const currentIndex = useMemo(
    () =>
      worksData?.data.attributes.Works.findIndex(
        (item) => item.work.data[0].attributes.Title === name
      ),
    [name, worksData]
  );

  const previous =
    currentIndex > 0
      ? worksData?.data.attributes.Works[currentIndex - 1].work.data[0]
          .attributes.Title
      : undefined;

  const next =
    currentIndex < worksData?.data.attributes.Works.length - 1
      ? worksData?.data.attributes.Works[currentIndex + 1].work.data[0]
          .attributes.Title
      : undefined;

  const galleryContainer = useRef();
  const [galleryScrollStatus, setGalleryScrollStatus] = useState(0);
  const galleryViewPercentage = galleryContainer?.current
    ? document.documentElement.clientWidth /
      galleryContainer.current.scrollWidth
    : 0;

  if (!loading && workData?.data?.length === 0) {
    return <>404</>;
  }

  if (error || errorWorks) {
    return <>Error</>;
  }

  if (loading || loadingWorks || !workData || !worksData) {
    return <>Loading</>;
  }

  const work = {
    ...workData.data[0].attributes,
  };

  return (
    <div className={classes.workDetailPage}>
      <Link to="/work" className={classes.backLink}>
        Back to work
      </Link>
      <article className={classes.workDetail}>
        <img
          src={`${process.env.REACT_APP_API_URL}${work.Hero.data.attributes.url}`}
          alt={work.Hero.data.attributes.alternativeText}
          className={classes.hero}
        />
        <div className={classes.mainContent}>
          <div className="wrapper">
            <div className={classes.content}>
              <header className={classes.header}>
                <h1>{name}</h1>
                <p className={classes.subtitle}>{work.Subtitle}</p>
                {work.Tags?.data?.length > 0 && (
                  <ul className={classes.tags}>
                    {work.Tags.data.map((tag) => (
                      <li key={tag.id}>{tag.attributes.Text}</li>
                    ))}
                  </ul>
                )}
              </header>
              <div className={classes.body1}>
                <Markdown content={work.Body1} />
              </div>
            </div>
          </div>
          {previous && (
            <Link className={classes.previous} to={previous}>
              Previous
            </Link>
          )}
          {next && (
            <Link className={classes.next} to={next}>
              Next
            </Link>
          )}
        </div>
        {work.ImageGallery?.data?.length > 0 && (
          <section className={classes.gallerySection}>
            <ScrollContainer
              innerRef={galleryContainer}
              onScroll={() => {
                if (galleryContainer.current) {
                  setGalleryScrollStatus(
                    galleryContainer.current.scrollLeft /
                      (galleryContainer.current.scrollWidth -
                        document.documentElement.clientWidth)
                  );
                }
              }}
            >
              <ul className={classes.gallery}>
                {work.ImageGallery.data.map((image) => (
                  <li key={image.id} className={classes.imageItem}>
                    <img
                      className={classes.image}
                      src={`${process.env.REACT_APP_API_URL}${image.attributes.url}`}
                      alt={image.attributes.alternativeText}
                    />
                  </li>
                ))}
              </ul>
            </ScrollContainer>
            <div className={classes.scrollStatus}>
              <div
                className={classes.scrollStatusPusher}
                style={{ width: `${galleryScrollStatus * 100}%` }}
              />
              <div
                className={classes.scrollStatusBar}
                style={{ width: `${galleryViewPercentage * 100}%` }}
              />
              <div
                className={classes.scrollStatusPusher}
                style={{ width: `${(1 - galleryScrollStatus) * 100}%` }}
              />
            </div>
          </section>
        )}
        <img
          src={`${process.env.REACT_APP_API_URL}${work.BigPicture.data.attributes.url}`}
          alt={work.BigPicture.data.attributes.alternativeText}
          className={classes.bigPicture}
        />
        <div className="wrapper">
          <div className={classes.body2}>
            <Markdown content={work.Body2} />
          </div>
        </div>
        {work.VimeoVideo && (
          <iframe
            title="Vimeo Video"
            src={`https://player.vimeo.com/video/${work.VimeoVideo.split(
              '/'
            ).pop()}`}
            className={classes.vimeoVideo}
            frameBorder="0"
            allow="fullscreen;"
            allowFullScreen
          ></iframe>
        )}
        <div className={classes.behance}>
          <p>
            <span>Find all project details on:</span>
            <br />
            <a href={work.BehanceLink} target="_blank" rel="noreferrer">
              <img src={behance} alt="behance" />
            </a>
          </p>
          {previous && (
            <Link className={classes.previous} to={previous}>
              Previous
            </Link>
          )}
          {next && (
            <Link className={classes.next} to={next}>
              Next
            </Link>
          )}
        </div>
      </article>
      <WorkTogether />
    </div>
  );
};

export default WorkDetail;
