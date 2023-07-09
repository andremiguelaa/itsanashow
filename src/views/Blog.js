import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import AppContext from 'AppContext';
import useRequest from 'utils/useRequest';

import classes from './Blog.module.scss';

const Blog = () => {
  const { setCursorType } = useContext(AppContext);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState();

  const { data: articlesData } = useRequest({
    url: 'articles?populate%5BAuthor%5D%5Bpopulate%5D%5BAvatar%5D=*&populate%5BTags%5D=*&populate%5BImage%5D=*',
    method: 'GET',
  });

  const availableTags = useMemo(
    () => [
      ...new Set(
        articlesData?.data.reduce((acc, item) => {
          item.attributes.Tags.data.forEach((tag) => {
            console.log(tag.attributes.Text);
            acc.push(tag.attributes.Text);
          });
          return acc;
        }, []) || []
      ),
    ],
    [articlesData]
  );

  const articlesToShow = useMemo(() => {
    if (!selectedTag) {
      return articlesData?.data || [];
    }
    return articlesData?.data.filter((article) =>
      article.attributes.Tags.data
        .map((tag) => tag.attributes.Text)
        .includes(selectedTag)
    );
  }, [selectedTag, articlesData]);

  return (
    <div className={classes.content}>
      <div className="wrapper">
        <p className={classes.lead}>Think, create, inspire</p>
        <p className={classes.caption}>Wrangling ideas, lassoing imagination</p>
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
                  }}
                >
                  {item}
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
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        <ul className={classes.articles}>
          {articlesToShow?.map((article) => (
            <li key={article.id} className={classes.article}>
              <Link
                className={classes.link}
                to={`/logbook/${article.attributes.Slug}`}
              >
                <div
                  className={classes.imageWrapper}
                  onMouseEnter={() => {
                    setCursorType('bigger');
                  }}
                  onMouseLeave={() => {
                    setCursorType('default');
                  }}
                >
                  <img
                    className={classes.image}
                    src={`${process.env.REACT_APP_API_URL}${article.attributes.Image.data.attributes.url}`}
                    alt={
                      article.attributes.Image.data.attributes.alternativeText
                    }
                  />
                  <div className={classes.overlay}></div>
                  <div className={classes.author}>
                    <img
                      className={classes.avatar}
                      src={`${process.env.REACT_APP_API_URL}${article.attributes.Author.Avatar.data.attributes.url}`}
                      alt={
                        article.attributes.Author.Avatar.data.attributes
                          .alternativeText
                      }
                    />
                    <div className={classes.authorInfo}>
                      Posted by
                      <br />
                      <strong>{article.attributes.Author.Name}</strong>
                    </div>
                  </div>
                </div>
                <p className={classes.date}>
                  {new Date(article.attributes.Date).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
                <p className={classes.title}>{article.attributes.Title}</p>
                <p className={classes.teaser}>{article.attributes.Teaser}</p>
                {article.attributes.Tags.data.map((tag) => (
                  <span className={classes.tag} key={tag.attributes.Text}>
                    {tag.attributes.Text}
                  </span>
                ))}
                <div className={classes.readMore}>Read more</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
