import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { remark } from "remark";
import strip from "strip-markdown";
import classNames from "classnames";

import { AppContext } from "src/AppContext";
import useRequest from "src/utils/useRequest";
import Markdown from "src/components/Markdown/Markdown";
import NoMatch from "src/components/NoMatch/NoMatch";
import Error from "src/components/Error/Error";

import classes from "./WorkDetail.module.scss";

export const getServerSideProps = async (context) => {
  if (context.params.slug !== "[object Object]") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/works?filters[$or][0][Slug][$eq]=${context.params.slug}&filters[$or][1][Title][$eq]=${context.params.slug}&populate=*`
    );
    const prefetchedWork = await res.json();
    let description;
    await remark()
      .use(strip)
      .process(prefetchedWork.data[0].attributes.Subtitle)
      .then((file) => {
        description = String(file).trim();
      });

    return {
      props: { prefetchedWork: { ...prefetchedWork.data[0], description } },
    };
  }
  return { props: { prefetchedWork: null } };
};

const WorkDetail = ({ prefetchedWork }) => {
  const { setCursorType } = useContext(AppContext);
  const {
    query: { slug },
  } = useRouter();
  const [name] = useState(slug);

  const {
    data: workData,
    loading,
    error,
  } = useRequest({
    url: `works?filters[$or][0][Slug][$eq]=${name}&filters[$or][1][Title][$eq]=${name}&populate=*`,
    method: "GET",
  });

  const {
    data: worksData,
    loading: loadingWorks,
    error: errorWorks,
  } = useRequest({
    url: "works-page?populate%5BWorks%5D%5Bpopulate%5D%5Bwork%5D=*",
    method: "GET",
  });

  const [metaData, setMetaData] = useState({
    title: prefetchedWork?.attributes.Title,
    description: prefetchedWork?.description,
    image: prefetchedWork
      ? prefetchedWork?.attributes.Teaser.data.attributes.url
      : undefined,
  });
  useEffect(() => {
    setCursorType("default");
    if (workData?.data?.[0]) {
      remark()
        .use(strip)
        .process(workData.data[0].attributes.Subtitle)
        .then((file) => {
          setMetaData({
            title: workData.data[0].attributes.Title,
            description: String(file),
            image: workData.data[0].attributes.Teaser.data.attributes.url,
          });
        });
    }
  }, [workData, setCursorType]);

  if (prefetchedWork && !workData) {
    return (
      <Head>
        <title>{`Itsanashow Studio | ${metaData.title}`}</title>
        <meta name="description" content={metaData.description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}${metaData.image}`}
        />
      </Head>
    );
  }

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

  console.log(work);

  return (
    <>
      <Head>
        <title>{`Itsanashow Studio | ${metaData.title}`}</title>
        <meta name="description" content={metaData.description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}${metaData.image}`}
        />
      </Head>
      <article className={classes.workDetail}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${work.Hero.data.attributes.url}`}
          alt={work.Hero.data.attributes.alternativeText}
          className={classes.hero}
        />
        <div className={classNames(classes.wrapper, classes.titleAndTags)}>
          <header className={classes.header}>
            <p className={classes.subtitle}>
              <Markdown content={work.Subtitle} />
            </p>
            <h1>{work.Title}</h1>
          </header>
          <div className={classes.tags}>
            {work.Tags?.data?.length > 0 && (
              <ul className={classes.tags}>
                {work.Tags.data.map((tag) => (
                  <li key={tag.id}>{tag.attributes.Text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.body}>
            <h1>{work.Section1Title}</h1>
            <Markdown content={work.Section1Body} />
          </div>
        </div>
        {work.VimeoVideo && (
          <iframe
            title="Vimeo Video"
            src={`https://player.vimeo.com/video/${work.VimeoVideo.split(
              "/"
            ).pop()}?title=0&byline=0&portrait=0`}
            className={classes.vimeoVideo}
            frameBorder="0"
            allow="fullscreen;"
            allowFullScreen
          ></iframe>
        )}
        {work.ImageGallery_1?.data && (
          <div className={classes.images}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_1.data[0]?.attributes.url}`}
              alt={
                work.ImageGallery_1.data[0]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_1.data[1]?.attributes.url}`}
              alt={
                work.ImageGallery_1.data[1]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_1.data[2]?.attributes.url}`}
              alt={
                work.ImageGallery_1.data[2]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_1.data[3]?.attributes.url}`}
              alt={
                work.ImageGallery_1.data[3]?.attributes.alternativeText || ""
              }
            />
          </div>
        )}
        <div className={classes.wrapper}>
          <div className={classes.body}>
            <h1>{work.Section2Title}</h1>
            <Markdown content={work.Section2Body} />
          </div>
        </div>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${work.BigPicture.data.attributes.url}`}
          alt={work.BigPicture.data.attributes.alternativeText}
          className={classes.bigPicture}
        />
        {work.ImageGallery_2?.data && (
          <div className={classes.images}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_2.data[0]?.attributes.url}`}
              alt={
                work.ImageGallery_2.data[0]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_2.data[1]?.attributes.url}`}
              alt={
                work.ImageGallery_2.data[1]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_2.data[2]?.attributes.url}`}
              alt={
                work.ImageGallery_2.data[2]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_2.data[3]?.attributes.url}`}
              alt={
                work.ImageGallery_2.data[3]?.attributes.alternativeText || ""
              }
            />
          </div>
        )}
        {work.Quote && (
          <div className={classes.wrapper}>
            <div className={classes.quote}>
              <p className={classes.text}>&ldquo;{work.Quote.Quote}&rdquo;</p>
              {work.Quote.Author && (
                <p className={classes.author}>{work.Quote.Author}</p>
              )}
              {work.Quote.Role && (
                <p className={classes.role}>{work.Quote.Role}</p>
              )}
            </div>
          </div>
        )}
        {work.ImageGallery_3?.data && (
          <div className={classes.images}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_3.data[0]?.attributes.url}`}
              alt={
                work.ImageGallery_3.data[0]?.attributes.alternativeText || ""
              }
            />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${work.ImageGallery_3.data[1]?.attributes.url}`}
              alt={
                work.ImageGallery_3.data[1]?.attributes.alternativeText || ""
              }
            />
          </div>
        )}
      </article>
    </>
  );
};

export default WorkDetail;
