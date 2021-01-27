import React, { useReducer } from "react";
import { Header, Loader, TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Switch, Route, useParams, useRouteMatch, Redirect } from "react-router-dom";
import { SelectPaymentType } from "./payment-type/index";
import { SuccessfulPayment, FailedPayment } from "./response";

const CitizenPayment = ({ stateCode, cityCode, moduleCode }) => {
  const { path: currentPath } = useRouteMatch();
  const commonProps = { stateCode, cityCode, moduleCode };

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${currentPath}/collect/:businessService/:consumerCode`}>
          <SelectPaymentType {...commonProps} basePath={currentPath} />
        </Route>
        <Route path={`${currentPath}/success`}>
          <SuccessfulPayment {...commonProps} />
        </Route>
        <Route path={`${currentPath}/failure`}>
          <FailedPayment {...commonProps} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CitizenPayment;
