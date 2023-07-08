import React from 'react';

import useRequest from 'utils/useRequest';

import classes from './Instagram.module.scss';

const Instagram = () => {
  const { data } = useRequest({
    url: 'me/media',
    method: 'GET',
    baseURL: 'https://graph.instagram.com/v14.0/',
  });

  console.log(data);

  return <>{data && <section className={classes.instagram}></section>}</>;
};

export default Instagram;
