import React from "react";
import Slider from "react-slick";

import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./HomepageClients.module.scss";

const HomepageClients = ({clients}) => {
  const logoSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    touchThreshold: 100,
  };

  return (
    <section className={classes.clients}>
      <div className="wrapper">
        <p className={classes.lead}>
          <AnimatedText>Our Partners in Creativity</AnimatedText>
        </p>
      </div>
      {clients.length > 0 && (
        <ul className={classes.clientsList}>
          <Slider {...logoSliderSettings}>
            {clients.map((client) => (
              <li key={client.id}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${client.Logo}`}
                  alt={client.Name}
                />
              </li>
            ))}
          </Slider>
        </ul>
      )}
    </section>
  );
};

export default HomepageClients;
