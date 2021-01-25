import React, { useReducer } from "react";
import { Header, Loader, TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Switch, Route, useParams, useRouteMatch, Redirect } from "react-router-dom";
import { SelectPaymentType } from "./payment-type/index";

const CitizenPayment = ({ stateCode, cityCode, moduleCode }) => {
  const userType = "citizen";
  const { t } = useTranslation();
  const { path: currentPath } = useRouteMatch();
  const param = useParams();

  const commonProps = { stateCode, cityCode, moduleCode };

  const config = {
    ["payment-type"]: {
      component: () => <SelectPaymentType {...commonProps} />,
    },
    cash: {
      component: () => <SelectPaymentType {...commonProps} />,
    },
    cheque: {
      component: () => <SelectPaymentType {...commonProps} />,
    },
    ["credit-debit-card"]: {
      component: () => <SelectPaymentType {...commonProps} />,
    },
  };

  const paths = Object.keys(config);

  console.log("paths", paths);
  console.log("current", currentPath, param);

  return (
    <React.Fragment>
      <Switch>
        {paths.map((path, index) => (
          <Route path={`${currentPath}/:consumerCode/${path}`} key={index} component={config[path].component} />
        ))}
      </Switch>
    </React.Fragment>
  );
};

export default CitizenPayment;
