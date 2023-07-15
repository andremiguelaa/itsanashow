import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';

import AppContext from 'AppContext';
import useRequest from 'utils/useRequest';
import Markdown from 'components/Markdown/Markdown';

import classes from './Article.module.scss';

const Article = () => {
  const { setCursorType } = useContext(AppContext);
  const { slug } = useParams();

  const { data: articleData } = useRequest({
    url: `articles?filters%5Bslug%5D%5B%24eq%5D=${slug}&populate%5BAuthor%5D%5Bpopulate%5D%5BAvatar%5D=*&populate%5BTags%5D=*&populate%5BImage%5D=*&populate%5BBody%5D%5Bpopulate%5D=*`,
    method: 'GET',
  });

  const { data: articlesData } = useRequest({
    url: 'articles?populate%5BAuthor%5D%5Bpopulate%5D%5BAvatar%5D=*&populate%5BThumbnail%5D=*',
    method: 'GET',
  });

  const article = articleData?.data?.[0];

  const articles =
    article && articlesData
      ? articlesData.data.filter((item) => item.id !== article.id).slice(0, 3)
      : [];

  if (!article) {
    return null;
  }

  return (
    <>
      <div className={classnames('wrapper', classes.backLinkWrapper)}>
        <Link to="/logbook" className={classes.backLink}>
          Back to logbook
        </Link>
      </div>
      <div className={classes.content}>
        <img
          src={`${process.env.REACT_APP_API_URL}${article.attributes.Image.data.attributes.url}`}
          alt={article.attributes.Image.data.attributes.alternativeText}
          className={classes.hero}
        />
        <div className="wrapper">
          <span className={classes.tags}>
            {article.attributes.Tags.data
              .map((tag) => tag.attributes.Text)
              .join(' | ')}
          </span>
          <h1 className={classes.title}>{article.attributes.Title}</h1>
          <p className={classes.date}>
            {new Date(article.attributes.Date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className={classes.body}>
            {article.attributes.Body.map((component) => {
              if (component.__component === 'content.markdown-content') {
                return (
                  <div
                    className={classes.markdownContent}
                    key={`${component.__component}-${component.id}`}
                  >
                    <Markdown content={component.Content} />
                  </div>
                );
              }
              if (component.__component === 'content.quote') {
                return (
                  <blockquote
                    className={classes.blockquote}
                    key={`${component.__component}-${component.id}`}
                  >
                    <div className={classes.quote}>{component.Quote}</div>
                    <div className={classes.quoteAuthor}>
                      <strong>{component.Author}</strong> - {component.Role}
                    </div>
                  </blockquote>
                );
              }
              if (component.__component === 'content.image') {
                return (
                  <div
                    className={classes.image}
                    key={`${component.__component}-${component.id}`}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}${component.Image.data.attributes.url}`}
                      alt={component.Image.data.attributes.alternativeText}
                    />
                    <div className={classes.caption}>
                      <Markdown content={component.Caption} />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={classes.author}>
            <img
              className={classes.avatar}
              src={`${process.env.REACT_APP_API_URL}${article.attributes.Author.Avatar.data.attributes.url}`}
              alt={
                article.attributes.Author.Avatar.data.attributes.alternativeText
              }
            />
            <div className={classes.authorInfo}>
              <div className={classes.written}>Written by</div>
              <a
                className={classes.name}
                href={article.attributes.Author.LinkedIn}
                target="_blank"
                rel="noreferrer"
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
                    to={`/logbook/${item.attributes.Slug}`}
                  >
                    <div
                      className={classes.imageWrapper}
                      onMouseEnter={() => {
                        setCursorType('read');
                      }}
                      onMouseLeave={() => {
                        setCursorType('default');
                      }}
                    >
                      <img
                        className={classes.image}
                        src={`${process.env.REACT_APP_API_URL}${item.attributes.Thumbnail.data.attributes.url}`}
                        alt={
                          item.attributes.Thumbnail.data.attributes
                            .alternativeText
                        }
                      />
                      <div className={classes.overlay}></div>
                      <div className={classes.author}>
                        <img
                          className={classes.avatar}
                          src={`${process.env.REACT_APP_API_URL}${item.attributes.Author.Avatar.data.attributes.url}`}
                          alt={
                            item.attributes.Author.Avatar.data.attributes
                              .alternativeText
                          }
                        />
                        <div className={classes.authorInfo}>
                          Posted by
                          <br />
                          <strong>{item.attributes.Author.Name}</strong>
                        </div>
                      </div>
                    </div>
                    <p className={classes.date}>
                      {new Date(item.attributes.Date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
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
