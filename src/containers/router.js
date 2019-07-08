import { Switch, Route } from "react-router-dom";
import React from "react";
import Test from "components/Test";
import Home from "components/Home";
import List from "pages/List";
import Hook from "pages/Hook";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/test" component={List} />
    <Route path="/hook" component={Hook} />
  </Switch>
);
