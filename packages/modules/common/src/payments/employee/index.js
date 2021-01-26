import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useRouteMatch, Switch, Route } from "react-router-dom";
import { CollectPayment } from "./payment-collect";
import { SuccessfulPayment, FailedPayment } from "./response";
import { SubformComposer } from "../../hoc";
// import { subFormRegistry } from "../../hoc/subFormClass";
import { testForm } from "../../hoc/testForm-config";
import { subFormRegistry } from "@egovernments/digit-ui-libraries";

subFormRegistry.addSubForm("testForm", testForm);

const EmployeePayment = ({ stateCode, cityCode, moduleCode }) => {
  const userType = "employee";
  const { t } = useTranslation();
  const { path: currentPath } = useRouteMatch();
  const param = useParams();

  const commonProps = { stateCode, cityCode, moduleCode };

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${currentPath}/collect/:consumerCode`}>
          <CollectPayment {...commonProps} basePath={currentPath} />
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

export default EmployeePayment;
