import React from "react";
import { useRouteMatch, Switch, useLocation } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import SearchPropertyComponent from "./SearchProperty";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  console.log("pt citizen", { path, url, ...match });
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  return (
    <Switch>
      <AppContainer style={mobileView ? { width: "87%" } : null}>
        <BackButton>Back</BackButton>
        <PrivateRoute path={`${path}/property/search`} component={SearchPropertyComponent} />
      </AppContainer>
    </Switch>
  );
};

export default App;
