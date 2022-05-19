import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';

import AppContext from 'AppContext';

import classes from './Cursor.module.scss';

const Cursor = () => {
  const { cursorType } = useContext(AppContext);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMousemove = ({ x, y }) => {
    setPosition({
      x,
      y,
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMousemove);
    return () => {
      document.removeEventListener('mousemove', handleMousemove);
    };
  }, []);

  return (
    <div
      className={classnames(classes.cursor, classes[cursorType])}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};

export default Cursor;
