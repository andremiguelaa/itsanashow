import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { remark } from 'remark';
import strip from 'strip-markdown';
import Slider from 'react-slick';

import AppContext from 'AppContext';
import useRequest from 'utils/useRequest';
import Markdown from 'components/Markdown/Markdown';
import WorkTogether from 'components/WorkTogether/WorkTogether';
import NoMatch from 'views/NoMatch';
import Error from 'views/Error';

import behance from 'assets/behance.svg';

import classes from './WorkDetail.module.scss';

const WorkDetail = () => {
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

  const { name } = useParams();

  const {
    data: workData,
    loading,
    error,
  } = useRequest({
    url: `works?filters[$or][0][Slug][$eq]=${name}&filters[$or][1][Title][$eq]=${name}&populate=*`,
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

  const [metaData, setMetaData] = useState();
  useEffect(() => {
    if (workData?.data?.[0]) {
      remark()
        .use(strip)
        .process(workData.data[0].attributes.Subtitle)
        .then((file) => {
          setMetaData({
            title: workData.data[0].attributes.Title,
            description: String(file),
          });
        });
    }
  }, [workData]);

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

  if (!loading && workData?.data?.length === 0) {
    return <NoMatch />;
  }

  if (error || errorWorks) {
    return <Error />;
  }

  if (loading || loadingWorks || !workData || !worksData || !metaData) {
    return null;
  }

  const work = {
    ...workData.data[0].attributes,
  };

  return (
    <>
      <Helmet>
        <title>Itsanashow Studio | Our Work | {metaData.title}</title>
        <meta name="description" content={metaData.description} />
      </Helmet>
      <article className={classes.workDetail}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${work.Hero.data.attributes.url}`}
          alt={work.Hero.data.attributes.alternativeText}
          className={classes.hero}
        />
        <div className={classes.mainContent}>
          <div className="wrapper">
            <div className={classes.content}>
              <header className={classes.header}>
                <h1>{work.Title}</h1>
                <p className={classes.subtitle}>
                  <Markdown content={work.Subtitle} />
                </p>
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
            <Link
              className={classes.previous}
              href={previous}
              onMouseEnter={() => {
                setCursorType('bigger');
              }}
              onMouseLeave={() => {
                setCursorType('default');
              }}
            >
              Previous
            </Link>
          )}
          {next && (
            <Link
              className={classes.next}
              href={next}
              onMouseEnter={() => {
                setCursorType('bigger');
              }}
              onMouseLeave={() => {
                setCursorType('default');
              }}
            >
              Next
            </Link>
          )}
        </div>
        {work.ImageGallery?.data?.length > 0 && (
          <section className={classes.gallerySection}>
            <div className={classes.gallery}>
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
                  {work.ImageGallery.data.map((image) => (
                    <div key={image.id}>
                      <div className={classes.imageItem}>
                        <img
                          className={classes.image}
                          src={`${process.env.NEXT_PUBLIC_API_URL}${image.attributes.url}`}
                          alt={image.attributes.alternativeText}
                        />
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
                  width: `${100 / work.ImageGallery?.data?.length}%`,
                  transform: `translateX(${currentSlide * 100}%)`,
                }}
              />
            </div>
          </section>
        )}
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${work.BigPicture.data.attributes.url}`}
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
            ).pop()}?title=0&byline=0&portrait=0`}
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
            <a
              href={work.BehanceLink}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => {
                setCursorType('bigger');
              }}
              onMouseLeave={() => {
                setCursorType('default');
              }}
            >
              <img src={behance} alt="behance" className={classes.logo} />
            </a>
          </p>
          {previous && (
            <Link
              className={classes.previous}
              href={previous}
              onMouseEnter={() => {
                setCursorType('bigger');
              }}
              onMouseLeave={() => {
                setCursorType('default');
              }}
            >
              Previous
            </Link>
          )}
          {next && (
            <Link
              className={classes.next}
              href={next}
              onMouseEnter={() => {
                setCursorType('bigger');
              }}
              onMouseLeave={() => {
                setCursorType('default');
              }}
            >
              Next
            </Link>
          )}
        </div>
      </article>
      <WorkTogether />
    </>
  );
};

export default WorkDetail;
