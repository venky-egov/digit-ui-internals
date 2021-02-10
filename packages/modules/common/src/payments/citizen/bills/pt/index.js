import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import { BillListPT } from "./my-bills";
import BillDetails from "./bill-details";

const PTBillRoutes = ({ billsList }) => {
  const { url: currentPath, ...match } = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${currentPath}`} component={() => <BillListPT {...{ billsList, currentPath }} />} />
        <Route path={`${currentPath}/:consumerCode`} component={() => <BillDetails />} />
      </Switch>
    </React.Fragment>
  );
};

export default PTBillRoutes;
