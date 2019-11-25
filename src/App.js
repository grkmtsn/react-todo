import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { List, Action, NotFound } from '@/pages';

const App = () => {
  return (
    <div className="wrapper">
      <Helmet>
        <meta charset="utf-8" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <title>React To-Do App</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/task" component={Action} />
          <Route path="/404" component={NotFound} />
          <Route component={() => <Redirect to="/404" />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
