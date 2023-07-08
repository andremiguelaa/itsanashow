import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContext from './AppContext';

import Cursor from 'components/Cursor/Cursor';
import AppBody from 'AppBody';

const App = () => {
  const [modal, setModal] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [textAnimationAvailable, setTextAnimationAvailable] = useState(true);
  const [scrollElement, setScrollElement] = useState(null);
  return (
    <AppContext.Provider
      value={{
        modal,
        setModal,
        cursorType,
        setCursorType,
        textAnimationAvailable,
        setTextAnimationAvailable,
        scrollElement,
        setScrollElement,
      }}
    >
      <Cursor />
      <Router>
        <AppBody />
      </Router>
    </AppContext.Provider>
  );
};

export default App;
