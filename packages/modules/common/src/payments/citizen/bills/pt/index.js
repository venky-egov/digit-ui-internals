import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import { BillListPT } from "./my-bills";
import BillDetails from "./bill-details";
import { BackButton } from "@egovernments/digit-ui-react-components";

const PTBillRoutes = ({ billsList, paymentRules }) => {
  const { url: currentPath, ...match } = useRouteMatch();

  return (
    <React.Fragment>
      <BackButton />
      <Switch>
        <Route exact path={`${currentPath}`} component={() => <BillListPT {...{ billsList, currentPath, paymentRules }} />} />
        <Route path={`${currentPath}/:consumerCode`} component={() => <BillDetails {...{ paymentRules }} />} />
      </Switch>
    </React.Fragment>
  );
};

export default PTBillRoutes;
