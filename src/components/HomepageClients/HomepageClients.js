import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./HomepageClients.module.scss";

const HomepageClients = ({ clients }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      loop: true,
      align: "start",
    },
    [AutoScroll({ playOnInit: true, stopOnInteraction: false, startDelay: 0 })]
  );
  return (
    <section className={classes.clients}>
      <div className="wrapper">
        <p className={classes.lead}>
          <AnimatedText>Our Partners in Creativity</AnimatedText>
        </p>
      </div>
      {clients.length > 0 && (
        <div ref={emblaRef} className={classes.embla}>
          <div className={classes.embla__container}>
            {clients.map((client) => (
              <div key={client.id} className={classes.embla__slide}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${client.Logo}`}
                  alt={client.Name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomepageClients;
