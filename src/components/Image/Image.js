import React, { useState } from "react";
import classNames from "classnames";

import classes from "./Image.module.scss";

const Image = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(classes.image, {
        [classes.loaded]: loaded,
      })}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
};

export default Image;
