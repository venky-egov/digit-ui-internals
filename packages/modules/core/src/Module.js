import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getI18n } from "react-i18next";
import { Body, Loader } from "@egovernments/digit-ui-react-components";
import { TLModule, TLLinks } from "@egovernments/digit-ui-module-tl/src/Module";
import { DigitApp } from "./components/App";

import getStore from "./redux/store";

const DigitUIWrapper = ({ stateCode, enabledModules, moduleReducers }) => {
  const { isLoading, data: initData } = Digit.Hooks.useInitStore(stateCode, enabledModules);

  if (isLoading) {
    return <Loader page={true} />;
  }
  const getTenants = (codes, tenants) => {
    return tenants.filter((tenant) => codes.map((item) => item.code).includes(tenant.code));
  };

  const i18n = getI18n();
  console.log("core module rendered", initData);
  return (
    <Provider store={getStore(initData, moduleReducers(initData))}>
      <Router>
        <Body>
          <DigitApp stateCode={stateCode} modules={initData?.modules} appTenants={initData.tenants} logoUrl={initData?.stateInfo?.logoUrl} />
        </Body>
      </Router>
    </Provider>
  );
};
const SearchModules = ({ stateCode, userType, modules, appTenants }) => {
  const { path } = useRouteMatch();
  const moduleList = ["TL", "PGR"];

  const appRoutes = modules
    .filter((module) => moduleList.includes(module.code))
    .map(({ code, tenants }, index) => {
      if (code === "TL") {
        return (
          <Route key={index} path={`${path}/tl`}>
            <TLModule stateCode={stateCode} cityCode="pb.amritsar" moduleCode={code} userType={userType} tenants={getTenants(tenants, appTenants)} />
          </Route>
        );
      }
      return;
    });
};

const SearchHome = ({ userType }) => {
  if (userType === "citizen") {
    return (
      <React.Fragment>
        <TLLinks matchPath={`/digit-ui/${userType}/tl`} userType={userType} />
      </React.Fragment>
    );
  }
  return (
    <div className="employee-app-container">
      <div className="ground-container">
        <div className="employeeCard">
          <div className="complaint-links-container">
            <div className="header">
              <span className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"
                    fill="white"
                  ></path>
                </svg>
              </span>
              <span className="text">TradeLicence</span>
            </div>
            <div className="body">
              {}
              <span className="link">
                <Link to="/digit-ui/employee/tl/search">TL Search</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DigitUI = ({ stateCode, registry, enabledModules, moduleReducers, appTenants, cityCode }) => {
  const userType = Digit.UserService.getType();
  const cityDetails = appTenants.find((tenant) => tenant.code === cityCode);
  const userDetails = Digit.SessionStorage.get("User");
  const initData = Digit.Services.useInitStore(stateCode);
  const queryClient = new QueryClient();

  if (Object.keys(initData).length === 0) {
    return <Loader page={true} />;
  }
  const ComponentProvider = Digit.Contexts.ComponentProvider;

  return (
    <div className={userType}>
      <QueryClientProvider client={queryClient}>
        <ComponentProvider.Provider value={registry}>
          <DigitUIWrapper stateCode={stateCode} enabledModules={enabledModules} moduleReducers={moduleReducers} />
        </ComponentProvider.Provider>
      </QueryClientProvider>
    </div>
  );
};
