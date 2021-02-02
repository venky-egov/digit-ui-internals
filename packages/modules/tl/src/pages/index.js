import React, { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SearchPage, { search } from "./search";
import Search from "./pages/employee/index";
const Search = () => {
  return (
    <React.Fragment>
      <div className="ground-container">
        <BackButton>Back</BackButton>
        <Switch>
          <Route path={match.url + "./search"} component={search} />
        </Switch>
      </div>
    </React.Fragment>
  );
};
