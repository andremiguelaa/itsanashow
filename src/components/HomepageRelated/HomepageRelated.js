import React, { useContext, useState } from "react";
import Link from "next/link";
import { InView } from "react-intersection-observer";
import classNames from "classnames";

import { AppContext } from "src/AppContext";
import Button from "src/components/Button/Button";
import arrow from "src/assets/buttons/arrowB.json";

import classes from "./HomepageRelated.module.scss";

const HomepageRelatedItem = ({ item }) => {
  const { setCursorType } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  return (
    <li
      className={classNames(classes.article, {
        [classes.visible]: visible,
      })}
    >
      <InView
        onChange={(InView) => {
          setVisible(InView);
        }}
      >
        <Link
          className={classes.link}
          href={`/insights/${item.attributes.Slug}`}
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
              alt={item.attributes.Thumbnail.data.attributes.alternativeText}
            />
            <div className={classes.overlay}></div>
            <div className={classes.author}>
              <img
                className={classes.avatar}
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.attributes.Author.Avatar.data.attributes.url}`}
                alt={
                  item.attributes.Author.Avatar.data.attributes.alternativeText
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
            {new Date(item.attributes.Date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className={classes.title}>{item.attributes.Title}</p>
        </Link>
      </InView>
    </li>
  );
};

const HomepageRelated = ({ articles }) => (
  <>
    {articles.length > 0 && (
      <div className={classes.related}>
        <div className="wrapper">
          <p className={classes.lead}>From Our Creative Minds</p>
          <p className={classes.caption}>Insights You’ll Love</p>
          <ul className={classes.articles}>
            {articles.map((item) => (
              <HomepageRelatedItem item={item} key={item.id} />
            ))}
          </ul>
          <div className={classes.cta}>
            <Button text="Dive Deeper" arrow={arrow} target="/insights" />
          </div>
        </div>
      </div>
    )}
  </>
);

export default HomepageRelated;
