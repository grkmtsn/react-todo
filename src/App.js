import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Home, NotFound } from '@/pages';


const App = () => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
        <title>React To-Do App</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/404" component={NotFound} />
          <Route component={() => <Redirect to="/404" />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
