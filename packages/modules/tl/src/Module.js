import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import getRootReducer from "./redux/reducers";
import defaultConfig from "./config";
import CitizenApp from "./pages/citizen";

import EmployeeApp from "./EmployeeApp";
import { Header, HomeLink, Loader } from "@egovernments/digit-ui-react-components";
import { fetchBusinessServiceByTenant } from "./redux/actions";
import { PGR_CITIZEN_CREATE_COMPLAINT } from "./constants/Citizen";

export const TLModule = () => {
  const { path } = useRouteMatch();
  const state = useSelector((state) => state["tl"]);
  const disptach = useDispatch();
};

export const TLLinks = ({ matchPath }) => {
  return (
    <React.Fragment>
      <Header>Search Page</Header>
    </React.Fragment>
  );
};
