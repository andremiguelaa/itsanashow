import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { keyBy } from 'lodash';

import useRequest from 'utils/useRequest';

import video from 'assets/video.mp4';
import frame from 'assets/frame.png';

import classes from './Home.module.scss';

const Home = () => {
  const { data: homepageData } = useRequest({
    url: 'homepage?populate=*',
    method: 'GET',
  });

  const { data: worksData } = useRequest({
    url: 'works?populate=*',
    method: 'GET',
  });

  const { data: tagsData } = useRequest({
    url: 'tags?populate=*',
    method: 'GET',
  });

  const { data: clientsData } = useRequest({
    url: 'clients?populate=*',
    method: 'GET',
  });

  const portfolioHighlights = useMemo(() => {
    if (
      homepageData?.data?.attributes?.PortfolioHighlights?.length > 0 &&
      worksData
    ) {
      const worksById = keyBy(worksData.data, 'id');
      return homepageData.data.attributes.PortfolioHighlights.map(
        ({ id }) => worksById[id]
      );
    }
    return [];
  }, [homepageData, worksData]);

  const skills = useMemo(() => {
    if (homepageData?.data?.attributes?.Tags?.length > 0 && tagsData) {
      const tagsById = keyBy(tagsData.data, 'id');
      return homepageData.data.attributes.Tags.map(({ id }) => tagsById[id]);
    }
    return [];
  }, [homepageData, tagsData]);

  const clients = useMemo(() => {
    if (homepageData?.data?.attributes?.Clients?.length > 0 && clientsData) {
      const clientsById = keyBy(clientsData.data, 'id');
      return homepageData.data.attributes.Clients.map(
        ({ id }) => clientsById[id]
      );
    }
    return [];
  }, [homepageData, clientsData]);

  return (
    <>
      <section className={classes.intro}>
        <p className={classes.lead}>We are Itsanashow</p>
        <p className={classes.description}>
          A creative studio who loves to shape beautiful and meaningful stories
          through motion, design and user experience.
        </p>
      </section>
      <section className={classes.video}>
        <p className={classes.callout}>Play our reel</p>
        <video src={video} poster={frame} />
      </section>
      <section className={classes.work}>
        <p className={classes.lead}>Meet our work</p>
        <p className={classes.description}>
          We work closely with our clients and partners crafting visual
          solutions and collecting amazing experiences.
        </p>
        {portfolioHighlights.length > 0 && (
          <ul className={classes.portfolioHighlights}>
            {portfolioHighlights.map((portfolioHighlight, index) => (
              <li key={portfolioHighlight.id}>
                <Link to={`/work/${portfolioHighlight.attributes.Title}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${portfolioHighlight.attributes.Teaser.data.attributes.url}`}
                    alt={portfolioHighlight.attributes.Title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className={classes.skills}>
        <Link to="/work" className={classes.cta}>
          Wanna see more?
        </Link>
        <p className={classes.lead}>So what we do?</p>
        <p className={classes.description}>
          Fast-moving trends require rock-solid core skills. Our savoir-faire is
          broader than you may expect!
        </p>
        {skills.length > 0 && (
          <ul className={classes.skills}>
            {skills.map((skill) => (
              <li key={skill.id}>{skill.attributes.Text}</li>
            ))}
          </ul>
        )}
        <Link to="/us" className={classes.cta}>
          Get to know us!
        </Link>
      </section>
      <section className={classes.clients}>
        <p className={classes.lead}>Some happy clients and partners</p>
        <p className={classes.description}>
          Reach goals and keep rocking is our mojo!
        </p>
        {clients.length > 0 && (
          <ul className={classes.clients}>
            {clients.map((client) => (
              <li key={client.id}>
                <img
                  src={`${process.env.REACT_APP_API_URL}${client.attributes.Logo.data.attributes.url}`}
                  alt={client.attributes.Name}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Home;
