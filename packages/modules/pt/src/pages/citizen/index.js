import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
// import { MyBills } from "./MyBills";
import { Switch, useRouteMatch } from "react-router-dom";
import CreateProperty from "./Create";
import { MyApplications } from "./MyApplications";
import { MyProperties } from "./MyProperties/index";
import PropertyInformation from "./MyProperties/propertyInformation";
import PTApplicationDetails from "./PTApplicationDetails";
import SearchPropertyComponent from "./SearchProperty";
import SearchResultsComponent from "./SearchResults";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  return (
    <Switch>
      <AppContainer>
        <BackButton>Back</BackButton>
        <PrivateRoute path={`${path}/property/new-application`} component={CreateProperty} />
        <PrivateRoute path={`${path}/property/search`} component={SearchPropertyComponent} />
        <PrivateRoute path={`${path}/property/search-results`} component={SearchResultsComponent} />
        {/* <PrivateRoute path={`${path}/property/my-bills`} component={MyBills}></PrivateRoute> */}
        {/* <PrivateRoute path={`${path}/property/bill-details/:uniquePropertyId`} component={() => <BillDetails />}></PrivateRoute> */}
        <PrivateRoute path={`${path}/property/application/:acknowledgementIds`} component={PTApplicationDetails}></PrivateRoute>
        <PrivateRoute path={`${path}/property/my-applications`} component={MyApplications}></PrivateRoute>
        <PrivateRoute path={`${path}/property/my-properties`} component={MyProperties}></PrivateRoute>
        <PrivateRoute path={`${path}/property/properties/:propertyIds`} component={PropertyInformation}></PrivateRoute>
        {/* <Redirect to={`${path}/property/my-applications`}></Redirect> */}
      </AppContainer>
    </Switch>
  );
};

export default App;
