import React from "react";
import Head from "next/head";
import classnames from "classnames";
import AnimatedText from "src/components/AnimatedText/AnimatedText";

import classes from "./styles.module.scss";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Itsanashow Studio | Privacy Policy</title>
        <meta
          name="description"
          content="Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling."
        />
      </Head>
      <section className={classes.intro}>
        <div className={classnames("wrapper", classes.text)}>
          <p className={classes.description}>
            <AnimatedText delay={250}>
              We’re committed to respecting and protecting your privacy.
            </AnimatedText>
          </p>
        </div>
      </section>
      <section className={classes.content}>
        <div className={classnames("wrapper", classes.wrapper)}>
          <div className={classes.column}>
            <h1>Privacy Policy</h1>
            <p>
              Itsanashow Studio is the controller and responsible for your
              personal data (collectively referred to as ”COMPANY”, “we”, “us”
              or “our” in this privacy notice).
            </p>
            <p>
              We collect and use information about our web site visitors and
              those that interact with our services by reaching out via email in
              order to manage your relationship with Itsanashow Studio and to
              better serve you by personalizing your experience and how you
              connect with us.
            </p>
            <p>
              Itsanashow Studio does not collect any personal data when you use
              this website. This website is not intended for children and we do
              not knowingly collect data relating to children.
            </p>
            <p>
              This website may include links to third-party websites, plug-ins
              and applications. Clicking on those links or enabling those
              connections may allow third parties to collect or share data about
              you. We do not control these third-party websites and are not
              responsible for their privacy statements.
            </p>
            <h2>The data we collect about you</h2>
            <p>
              We do not collect any personal data on our website and do not
              encourage you to share any personal data with us.
            </p>
            <p>
              If you decide to send us an email to the email address provided on
              &apos;Contact Us&apos; or the &apos;Know Us&apos; sections of the
              web page, write to us or call us, you do that at your free will.
            </p>
            <p>
              As a result of your contact with us, we may collect some personal
              data, or personal information, meaning any information about an
              individual from which that person can be identified. It does not
              include data where the identity has been removed (anonymous data).
              We only collect your personal data when you choose to give it to
              us by corresponding with us by post, phone, email or otherwise.
            </p>
            <p>
              You may choose to provide us with different kinds of personal data
              about you which we have grouped together follows:
            </p>
            <p>
              <strong>Identity Data</strong> includes first name, maiden name,
              last name, username or similar identifier, marital status, title,
              date of birth and gender. <strong>Contact Data</strong> includes
              billing address, delivery address, email address and telephone
              numbers.
            </p>
            <p>
              On the Itsanashow Studio website we collect, use and share
              Aggregated Data such as statistical or demographic data for any
              purpose. Aggregated Data may be derived from your personal data
              but is not considered personal data in law as this data does not
              directly or indirectly reveal your identity. For example, we may
              aggregate your Usage Data to calculate the percentage of users
              accessing a specific section of Itsanashow Studio website.
            </p>
          </div>
          <div className={classes.column}>
            <h2>Purposes for which we will use your personal data</h2>
            <p>
              We may use the information collected for the following purposes:
            </p>
            <ul>
              <li>
                To manage our relationship with you and performance of a
                contract with you
              </li>
              <li>
                To conduct ordinary business operations such as sales,
                marketing, support, education and training
              </li>
              <li>
                To deliver relevant site content to you and measure or
                understand the effectiveness of the marketing messages we serve
                to you
              </li>
              <li>
                To use data analytics to improve our site, products/services,
                marketing, customer relationships and experiences
              </li>
              <li>
                To make suggestions and recommendations to you about services or
                products that may be of interest to you
              </li>
              <li>
                To ask you to leave a review or complete a survey To notifying
                you about changes to our terms or privacy policy
              </li>
            </ul>
            <p>
              Please{" "}
              <button
                className={classes.inlineButton}
                onClick={() => {
                  // setModal(true);
                }}
              >
                Contact us
              </button>{" "}
              if you need details about the specific legal ground we are relying
              on to process your personal data where more than one ground has
              been set out in the table below.
            </p>
            <h1>Cookie Policy</h1>
            <p>
              Our website uses cookies to distinguish you from other users of
              our website. This helps us to provide you with a good experience
              when you browse our website and also allows us to improve our
              site. By continuing to browse the site, you are agreeing to our
              use of cookies.
            </p>
            <p>
              A cookie is a small file of letters and numbers that we store on
              your browser or the hard drive of your computer if you agree.
              Cookies contain information that is transferred to your
              computer&apos;s hard drive.
            </p>
            <p>We use the following cookies:</p>
            <p>
              Analytical/performance cookies. They allow us to recognise and
              count the number of visitors and to see how visitors move around
              our website when they are using it. This helps us to improve the
              way our website works, for example, by ensuring that users are
              finding what they are looking for easily.
            </p>
            <p>
              Targeting cookies. These cookies record your visit to our website,
              the pages you have visited and the links you have followed. We
              will use this information to make our website and the advertising
              displayed on it more relevant to your interests. We may also share
              this information with third parties for this purpose.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
