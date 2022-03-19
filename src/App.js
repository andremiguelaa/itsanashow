import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from 'components/Header/Header';
import Home from 'views/Home';
import Us from 'views/Us';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [modal, setModal] = useState(false);
  return (
    <Router>
      <Header setModal={setModal} />
      <Switch>
        <Route exact path="/">
          <Home setModal={setModal} />
        </Route>
        <Route exact path="/us">
          <Us />
        </Route>
      </Switch>
      <Modal modal={modal} setModal={setModal} />
    </Router>
  );
};

export default App;
