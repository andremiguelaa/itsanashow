import React, { useState } from "react";
import classNames from "classnames";

import classes from "./Image.module.scss";

const Image = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(className, classes.image, {
        [classes.loaded]: loaded,
      })}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
};

export default Image;
