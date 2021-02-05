import React from "react";
import { MyApplications } from "./MyApplications";
import { MyBills } from "./MyBills";
import { BillDetails } from "./bill-details";

import { useRouteMatch, Switch, useLocation, Redirect } from "react-router-dom";
import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import SearchPropertyComponent from "./SearchProperty";
import SearchResultsComponent from "./SearchResults";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  console.log("pt citizen", { path, url, ...match });
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  return (
    <Switch>
      <AppContainer>
        <BackButton>Back</BackButton>
        <PrivateRoute path={`${path}/property/search`} component={SearchPropertyComponent} />
        <PrivateRoute path={`${path}/property/search-results`} component={SearchResultsComponent} />
        <PrivateRoute path={`${path}/property/my-bills`} component={MyBills}></PrivateRoute>
        <PrivateRoute path={`${path}/property/bill-details/:uniquePropertyId`} component={() => <BillDetails />}></PrivateRoute>
        <PrivateRoute path={`${path}/property/my-applications`} component={MyApplications}></PrivateRoute>
        <Redirect to={`${path}/property/my-applications`}></Redirect>
      </AppContainer>
    </Switch>
  );
};

export default App;
