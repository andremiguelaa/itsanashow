import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import isTouchDevice from 'is-touch-device';

import AppContext from 'src/AppContext';

import classes from './Cursor.module.scss';

const isTouch = isTouchDevice();

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

  if (isTouch) {
    return null;
  }

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
