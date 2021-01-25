import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useRouteMatch, Switch, Route } from "react-router-dom";
import { CollectPayment } from "./payment-collect";
import { SuccessfulPayment, FailedPayment } from "./response";
import { SubformComposer } from "../../hoc";

const EmployeePayment = ({ stateCode, cityCode, moduleCode }) => {
  const userType = "employee";
  const { t } = useTranslation();
  const { path: currentPath } = useRouteMatch();
  const param = useParams();

  // const [formData, setFormData] = Digit.Hooks.useSessionStorage("paymentFormData", {});

  // const addParams = (data) => {
  //   setFormData({ ...formData, ...data });
  // };

  // const clearParams = () => {
  //   setFormData({});
  // };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const commonProps = { stateCode, cityCode, moduleCode };
  const routes = {
    ["payment-collect"]: {
      // component: () => <CollectPayment {...commonProps} />,
      component: () => <SubformComposer _key="testForm" getSubFormValue={(d) => console.log("formValue", d)} />,
    },
    success: {
      component: () => <SuccessfulPayment {...commonProps} />,
    },
    failed: {
      component: () => <FailedPayment {...commonProps} />,
    },
  };

  const paths = Object.keys(routes);

  return (
    <React.Fragment>
      <Switch>
        {paths.map((path, index) => (
          <Route path={`${currentPath}/${path}/:consumerCode`} key={index} component={routes[path].component} />
        ))}
      </Switch>
    </React.Fragment>
  );
};

export default EmployeePayment;
