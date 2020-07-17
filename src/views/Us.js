import React from 'react';
import video from 'assets/video.mp4';
import frame from 'assets/frame.png';
import showStripe from 'assets/showStripe.svg';
import showStripeAlt from 'assets/showStripeAlt.svg';
import classes from './Us.module.scss';

const Us = () => (
  <>
    <section className={classes.video}>
      <video autoPlay loop muted src={video} poster={frame}></video>
    </section>
    <section className={classes.we}>
      <div className={classes.wrapper}>
        <h1 className="title">Who we are</h1>
        <img src={showStripe} alt="line" className="line" />
        <p className="subtitle">Typical love story here!</p>
        <p className="description">
          Motion Animator meets Graphic Designer. She loves his moves, he loves
          her typography OCD. <strong>And bam!</strong> A match-made in digital
          heaven. Nine years of partnership later (both in life and at work)
          we've decided to bring our own bundle of joy into the world.
          <br />
          <strong>A freaking studio!</strong>
        </p>
        <p className="description">
          A new, exciting venture with the same unfaltering commitment, the same
          detail-oriented mindset, the same relentless elbow-grease we work into
          every project. And most important of all...
        </p>
        <p className="description">
          The same mad creativity, now <strong>with a kick-ass team!</strong>
        </p>
      </div>
    </section>
    <section className={classes.what}>
      <div className={classes.wrapper}>
        <h1 className="title">So what we do?</h1>
        <img src={showStripeAlt} alt="line" className="line" />
        <p className="subtitle">
          We love to give shape to beautiful and meaningful stories.
        </p>
        <p className="description">
          Fast-moving trends require rock-solid core skills.
          <br />
          Our savoir-faire is broader than you may expect!
        </p>
      </div>
      <ul className={classes.services}>
        <li>
          <img src="" alt="" />
          <h1 className={classes.title}>Video</h1>
          <ul className={classes.list}>
            <li>Animation</li>
            <li>2D &amp; 3D</li>
            <li>App Tutorials</li>
            <li>Explainer Videos</li>
            <li>Commercials</li>
            <li>Title Sequences</li>
            <li>Manifesto Videos</li>
            <li>Social Posts</li>
            <li>Gifs</li>
          </ul>
        </li>
        <li>
          <img src="" alt="" />
          <h1 className={classes.title}>Graphics</h1>
          <ul className={classes.list}>
            <li>Style Frames</li>
            <li>Storyboarding</li>
            <li>Illustration</li>
            <li>Infographics</li>
            <li>Iconography</li>
            <li>UI/UX</li>
            <li>Web Design</li>
            <li>App Design</li>
            <li>Wireframing</li>
          </ul>
        </li>
        <li>
          <img src="" alt="" />
          <h1 className={classes.title}>Brand</h1>
          <ul className={classes.list}>
            <li>Brand Development</li>
            <li>Logo &amp; ID Systems</li>
            <li>Logo Animation</li>
            <li>Brand Style Guides</li>
            <li>Collateral, Print &amp; Packaging</li>
            <li>Content Strategy</li>
            <li>Brand Identity</li>
          </ul>
        </li>
        <li>
          <img src="" alt="" />
          <h1 className={classes.title}>Content</h1>
          <ul className={classes.list}>
            <li>Script Development</li>
            <li>Storytelling</li>
            <li>UX Writing</li>
            <li>Copywriting</li>
            <li>Presentation Design</li>
            <li>Live-Action Production</li>
            <li>Photography</li>
            <li>Creative Direction</li>
          </ul>
        </li>
      </ul>
    </section>
    <section className={classes.clients}>
      <div className={classes.wrapper}>
        <h1 className="title">Some select clients</h1>
        <img src={showStripe} alt="line" className="line" />
        <p className="subtitle">Reach goals and keep rocking</p>
      </div>
      <ul className={classes.logos}>
        <li>
          <img src="http://lorempixel.com/173/30/" alt="logo" />
        </li>
        <li>
          <img src="http://lorempixel.com/80/42/" alt="logo" />
        </li>
        <li>
          <img src="http://lorempixel.com/196/29/" alt="logo" />
        </li>
        <li>
          <img src="http://lorempixel.com/217/20/" alt="logo" />
        </li>
        <li>
          <img src="http://lorempixel.com/126/32/" alt="logo" />
        </li>
        <li>
          <img src="http://lorempixel.com/211/32/" alt="logo" />
        </li>
      </ul>
    </section>
  </>
);

export default Us;
