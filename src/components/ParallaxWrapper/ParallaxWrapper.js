import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const ParallaxWrapper = ({ children, scrollContainer }) => (
  <ParallaxProvider scrollContainer={scrollContainer}>
    {children}
  </ParallaxProvider>
);

export default ParallaxWrapper;
