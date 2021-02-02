import React, { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SearchPage from "./SearchPage";

const Search = () => {
  const { path, url, ...match } = useRouteMatch();
  return (
    <React.Fragment>
      <Switch>
        <AppContainer>
          <BackButton>Back</BackButton>
          <PrivateRoute path={`${path}/SearchPage`} component={SearchPage} />
        </AppContainer>
      </Switch>
      <div className="ground-container">
        <BackButton>Back</BackButton>
        <Switch>
          <Route path={"http://localhost:3000/digit-ui/employee/tl" + "/SearchPage"} component={SearchPage} />
        </Switch>
      </div>
    </React.Fragment>
  );
};
