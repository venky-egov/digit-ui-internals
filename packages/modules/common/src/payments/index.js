import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, useRouteMatch, Route } from "react-router-dom";
import { Body, Loader } from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";

import EmployeePayment from "./employee";
import CitizenPayment from "./citizen";

export const PaymentModule = ({ deltaConfig = {}, stateCode, cityCode, moduleCode = "Payment", userType }) => {
  const { path, url } = useRouteMatch();
  const state = useSelector((state) => state);
  const language = state?.common?.selectedLanguage;
  const store = { data: {} }; //Digit.Services.useStore({}, { deltaConfig, stateCode, cityCode, moduleCode, language });
  if (Object.keys(store).length === 0) {
    return <Loader />;
  }

  // console.log("payment", userType, state, store);

  const getPaymentHome = () => {
    if (userType === "citizen") return <CitizenPayment {...{ stateCode, moduleCode, cityCode, path, url }} />;
    else return <EmployeePayment {...{ stateCode, cityCode, moduleCode }} />;
  };
  return <React.Fragment>{getPaymentHome()}</React.Fragment>;
};

export const PaymentLinks = ({ matchPath }) => <Fragment></Fragment>;
