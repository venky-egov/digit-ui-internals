import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, useRouteMatch } from "react-router-dom";
import { Body, Loader } from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";

export const PaymentModule = ({ deltaConfig = {}, stateCode, cityCode, moduleCode = "Payment", userType }) => {
  const { path, url } = useRouteMatch();
  const state = useSelector((state) => state);
  const language = state?.common?.selectedLanguage;
  const store = { data: {} }; //Digit.Services.useStore({}, { deltaConfig, stateCode, cityCode, moduleCode, language });

  if (Object.keys(store).length === 0) {
    return <Loader />;
  }

  console.log("payment", userType, state, store);

  return (
    <Fragment>
      <p>Payment</p>
    </Fragment>
  );
};

export const PaymentLinks = ({ matchPath }) => <Fragment></Fragment>;
