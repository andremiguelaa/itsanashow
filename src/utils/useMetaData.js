import { useEffect } from 'react';

const ROOT_TITLE = 'Itsanashow Studio';
const DEFAULT_DESCRIPTION =
  'Hello, we are itsanashow — a young but seasoned creative studio who loves to shape beautiful, meaningful stories through design, motion and storytelling.';

const useMetaData = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${ROOT_TITLE} | ${title}` : ROOT_TITLE;
    document.getElementsByTagName('meta')['description'].content = description
      ? description
      : DEFAULT_DESCRIPTION;

    return () => {
      document.title = ROOT_TITLE;
      document.getElementsByTagName('meta')['description'].content =
        DEFAULT_DESCRIPTION;
    };
  }, [title, description]);
};

export default useMetaData;
