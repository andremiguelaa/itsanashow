import React from 'react';
import { BrowserRouter as Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from 'views/Home';
import Us from 'views/Us';
import Work from 'views/Work';
import WorkDetail from 'views/WorkDetail';

const App = () => {
  const location = useLocation();
  return (
    <main>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
        >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/us">
              <Us />
            </Route>
            <Route exact path="/work">
              <Work />
            </Route>
            <Route exact path="/work/:name">
              <WorkDetail />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </main>
  );
};

export default App;
