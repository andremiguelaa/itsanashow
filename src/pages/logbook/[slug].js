import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";

import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";
import Markdown from "src/components/Markdown/Markdown";
import linkedin from "src/assets/linkedin.svg";
import twitter from "src/assets/twitter.svg";
import facebook from "src/assets/facebook.svg";

import classes from "./Article.module.scss";

export const getServerSideProps = async (context) => {
  if (context.params.slug !== "[object Object]") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][%24eq]=${context.params.slug}&populate[Author][populate][Avatar]=*&populate[Tags]=*&populate[Thumbnail]=*&populate[Body][populate]=*`
    );
    const prefetchedArticle = await res.json();
    return { props: { prefetchedArticle: prefetchedArticle.data[0] } };
  }
  return { props: { prefetchedArticle: null } };
};

const Article = ({ prefetchedArticle }) => {
  const { setCursorType } = useContext(AppContext);
  const {
    query: { slug: routerSlug },
  } = useRouter();
  const [slug] = useState(routerSlug);

  const { data: articleData } = useRequest({
    url: `articles?filters%5Bslug%5D%5B%24eq%5D=${slug}&populate%5BAuthor%5D%5Bpopulate%5D%5BAvatar%5D=*&populate%5BTags%5D=*&populate%5BImage%5D=*&populate%5BThumbnail%5D=*&populate%5BBody%5D%5Bpopulate%5D=*`,
    method: "GET",
  });

  const { data: articlesData } = useRequest({
    url: "articles?populate%5BAuthor%5D%5Bpopulate%5D%5BAvatar%5D=*&populate%5BThumbnail%5D=*",
    method: "GET",
  });

  const article = articleData?.data?.[0];

  const articles =
    article && articlesData
      ? articlesData.data.filter((item) => item.id !== article.id).slice(0, 3)
      : [];

  const [metaData, setMetaData] = useState({
    title: prefetchedArticle?.attributes.Title,
    description: prefetchedArticle?.attributes.Teaser,
    image: prefetchedArticle?.attributes.Thumbnail.data.attributes.url,
  });
  useEffect(() => {
    if (articleData?.data?.[0]) {
      setMetaData({
        title: articleData?.data?.[0].attributes.Title,
        description: articleData?.data?.[0].attributes.Teaser,
        image: articleData?.data?.[0].attributes.Thumbnail.data.attributes.url,
      });
    }
  }, [articleData]);

  if (prefetchedArticle && (!article || !metaData)) {
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

  if (!article || !metaData) {
    return null;
  }

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
      <div className={classnames("wrapper", classes.backLinkWrapper)}>
        <Link
          href="/logbook"
          className={classes.backLink}
          onMouseEnter={() => {
            setCursorType("bigger");
          }}
          onMouseLeave={() => {
            setCursorType("default");
          }}
        >
          Back to logbook
        </Link>
      </div>
      <div className={classes.content}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${article.attributes.Image.data.attributes.url}`}
          alt={article.attributes.Image.data.attributes.alternativeText}
          className={classes.hero}
        />
        <div className="wrapper">
          <span className={classes.tags}>
            {article.attributes.Tags.data
              .map((tag) => tag.attributes.Text)
              .join(" | ")}
          </span>
          <h1 className={classes.title}>{article.attributes.Title}</h1>
          <p className={classes.date}>
            {new Date(article.attributes.Date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className={classes.body}>
            {article.attributes.Body.map((component) => {
              if (component.__component === "content.markdown-content") {
                return (
                  <div
                    className={classes.markdownContent}
                    key={`${component.__component}-${component.id}`}
                  >
                    <Markdown content={component.Content} />
                  </div>
                );
              }
              if (component.__component === "content.quote") {
                return (
                  <blockquote
                    className={classes.blockquote}
                    key={`${component.__component}-${component.id}`}
                  >
                    <div className={classes.quote}>{component.Quote}</div>
                    {component.Author && component.Role && (
                      <div className={classes.quoteAuthor}>
                        <strong>{component.Author}</strong> - {component.Role}
                      </div>
                    )}
                  </blockquote>
                );
              }
              if (component.__component === "content.image") {
                return (
                  <div
                    className={classes.image}
                    key={`${component.__component}-${component.id}`}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${component.Image.data.attributes.url}`}
                      alt={component.Image.data.attributes.alternativeText}
                    />
                    <div className={classes.caption}>
                      <Markdown content={component.Caption} />
                    </div>
                  </div>
                );
              }
              if (component.__component === "content.vimeo") {
                return (
                  <div
                    className={classes.video}
                    key={`${component.__component}-${component.id}`}
                  >
                    <iframe
                      title="Vimeo Video"
                      src={`https://player.vimeo.com/video/${component.Link.split(
                        "/"
                      ).pop()}?title=0&byline=0&portrait=0`}
                      className={classes.vimeoVideo}
                      frameBorder="0"
                      allow="fullscreen;"
                      allowFullScreen
                    ></iframe>
                    <div className={classes.caption}>
                      <Markdown content={component.Caption} />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.authorData}>
              <img
                className={classes.avatar}
                src={`${process.env.NEXT_PUBLIC_API_URL}${article.attributes.Author.Avatar.data.attributes.url}`}
                alt={
                  article.attributes.Author.Avatar.data.attributes
                    .alternativeText
                }
              />
              <div className={classes.authorInfo}>
                <div className={classes.written}>Written by</div>
                <a
                  className={classes.name}
                  href={article.attributes.Author.LinkedIn}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => {
                    setCursorType("bigger");
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                >
                  {article.attributes.Author.Name}
                </a>
                <div className={classes.role}>
                  {article.attributes.Author.Role}
                </div>
                <div className={classes.description}>
                  {article.attributes.Author.Description}
                </div>
              </div>
            </div>
            <div className={classes.share}>
              Share:
              <ul>
                <li>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.toString()}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    <Image
                      src={linkedin.src}
                      alt="LinkedIn"
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={`http://twitter.com/share?text=${
                      article.attributes.Title
                    }&url=${window.location.toString()}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    <Image
                      src={twitter.src}
                      alt="Twitter"
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.toString()}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      setCursorType("bigger");
                    }}
                    onMouseLeave={() => {
                      setCursorType("default");
                    }}
                  >
                    <Image
                      src={facebook.src}
                      alt="Facebook"
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {articles.length > 0 && (
        <div className={classes.related}>
          <div className="wrapper">
            <p className={classes.lead}>Keep reading</p>
            <p className={classes.caption}>We think you may like these</p>
            <ul className={classes.articles}>
              {articles.map((item) => (
                <li className={classes.article} key={item.id}>
                  <Link
                    className={classes.link}
                    href={`/logbook/${item.attributes.Slug}`}
                  >
                    <div
                      className={classes.imageWrapper}
                      onMouseEnter={() => {
                        setCursorType("read");
                      }}
                      onMouseLeave={() => {
                        setCursorType("default");
                      }}
                    >
                      <img
                        className={classes.image}
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.attributes.Thumbnail.data.attributes.url}`}
                        alt={
                          item.attributes.Thumbnail.data.attributes
                            .alternativeText
                        }
                      />
                      <div className={classes.overlay}></div>
                      <div className={classes.author}>
                        <img
                          className={classes.avatar}
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.attributes.Author.Avatar.data.attributes.url}`}
                          alt={
                            item.attributes.Author.Avatar.data.attributes
                              .alternativeText
                          }
                        />
                        <div className={classes.authorInfo}>
                          Written by
                          <br />
                          <strong>{item.attributes.Author.Name}</strong>
                        </div>
                      </div>
                    </div>
                    <p className={classes.date}>
                      {new Date(item.attributes.Date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p className={classes.title}>{item.attributes.Title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
