import React, { useState, useMemo, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Lottie from "react-lottie-player";
import { InView } from "react-intersection-observer";
import classNames from "classnames";

import lasso from "src/assets/lasso.json";
import AppContext from "src/AppContext";
import useRequest from "src/utils/useRequest";

import classes from "./styles.module.scss";

const ARTICLES_PER_PAGE = 6;

const Blog = () => {
  const { setCursorType } = useContext(AppContext);
  const [articleVisibility, setArticleVisibility] = useState({});
  const [numberOfArticles, setNumberOfArticles] = useState(ARTICLES_PER_PAGE);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState();

  const { data: articlesData } = useRequest({
    url: "articles?populate%5BAuthor%5D%5Bpopulate%5D%5BAvatar%5D=*&populate%5BTags%5D=*&populate%5BThumbnail%5D=*",
    method: "GET",
  });

  const availableTags = useMemo(
    () => [
      ...new Set(
        articlesData?.data.reduce((acc, item) => {
          item.attributes.Tags.data.forEach((tag) => {
            acc.push(tag.attributes.Text);
          });
          return acc;
        }, []) || []
      ),
    ],
    [articlesData]
  );

  const filteredArticles = useMemo(() => {
    let articles;
    if (!selectedTag) {
      articles = articlesData?.data || [];
    } else {
      articles = articlesData?.data.filter((article) =>
        article.attributes.Tags.data
          .map((tag) => tag.attributes.Text)
          .includes(selectedTag)
      );
    }
    return articles;
  }, [selectedTag, articlesData]);

  const articlesToShow = filteredArticles
    .slice(0, numberOfArticles)
    .sort((a, b) => b.attributes.Date.localeCompare(a.attributes.Date));

  return (
    <>
      <Head>
        <title>Itsanashow Studio | Insights</title>
        <meta
          name="description"
          content="Discover our insights on creativity, animation, storytelling, business, user experience, and more. Join us in wrangling ideas and lassoing imagination. Let's think, create, and inspire together!"
        />
      </Head>
      <div className={classes.content}>
        <div className="wrapper">
          <p className={classes.lead}>Think, create, inspire</p>
          <p className={classes.caption}>
            Wrangling ideas, lassoing imagination
          </p>
          <div className={classes.lasso}>
            <div className={classes.lassoContainer}>
              <Lottie animationData={lasso} play loop />
            </div>
          </div>
          <div className={classes.filters}>
            <button
              className={classNames(classes.toggle, {
                [classes.visible]: showTags,
              })}
              onClick={() => {
                setShowTags((prev) => !prev);
              }}
            >
              Show categories
            </button>
            <ul
              className={classNames(classes.tags, {
                [classes.visible]: showTags,
              })}
            >
              {availableTags.map((item) => (
                <li
                  key={item}
                  className={classNames(classes.tag, {
                    [classes.visible]: showTags,
                  })}
                >
                  <button
                    className={classNames(classes.tagButton, {
                      [classes.visible]: showTags,
                      [classes.selected]: selectedTag === item,
                    })}
                    onClick={() => {
                      setSelectedTag(item);
                      setNumberOfArticles(ARTICLES_PER_PAGE);
                    }}
                  >
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
            {showTags && selectedTag && (
              <div className={classes.resetWrapper}>
                <button
                  className={classes.reset}
                  onClick={() => {
                    setSelectedTag();
                    setShowTags(false);
                    setNumberOfArticles(ARTICLES_PER_PAGE);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
          <ul className={classes.articles}>
            {articlesToShow?.map((article, index) => (
              <li key={article.id} className={classes.article}>
                <InView
                  onChange={(InView) => {
                    setArticleVisibility((prev) => ({
                      ...prev,
                      [article.id]: InView,
                    }));
                  }}
                >
                  <Link
                    className={classes.link}
                    href={`/logbook/${article.attributes.Slug}`}
                  >
                    <div
                      className={classNames(classes.linkContent, {
                        [classes.visible]: articleVisibility[article.id],
                      })}
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
                          src={`${process.env.NEXT_PUBLIC_API_URL}${article.attributes.Thumbnail.data.attributes.url}`}
                          alt={
                            article.attributes.Thumbnail.data.attributes
                              .alternativeText
                          }
                        />
                        <div className={classes.overlay}></div>
                        <div className={classes.author}>
                          <img
                            className={classes.avatar}
                            src={`${process.env.NEXT_PUBLIC_API_URL}${article.attributes.Author.Avatar.data.attributes.url}`}
                            alt={
                              article.attributes.Author.Avatar.data.attributes
                                .alternativeText
                            }
                          />
                          <div className={classes.authorInfo}>
                            Written by
                            <br />
                            <strong>{article.attributes.Author.Name}</strong>
                          </div>
                        </div>
                      </div>
                      <p className={classes.date}>
                        {new Date(article.attributes.Date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className={classes.title}>
                        {article.attributes.Title}
                      </p>
                      <p className={classes.teaser}>
                        {article.attributes.Teaser}
                      </p>
                      {article.attributes.Tags.data.map((tag) => (
                        <span className={classes.tag} key={tag.attributes.Text}>
                          {tag.attributes.Text}
                        </span>
                      ))}
                    </div>
                    <div
                      className={classNames(classes.readMore, {
                        [classes.visible]: articleVisibility[article.id],
                      })}
                    >
                      <span>Read more</span>
                    </div>
                  </Link>
                </InView>
              </li>
            ))}
          </ul>
          {filteredArticles.length > numberOfArticles && (
            <button
              className={classes.seeMore}
              onClick={() => {
                setNumberOfArticles((prev) => prev + ARTICLES_PER_PAGE);
              }}
            >
              Let me see more
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
