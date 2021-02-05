import React from "react";
import ReactDOM from "react-dom";

import { initLibraries } from "@egovernments/digit-ui-libraries";
import { PGRModule, PGRLinks, PGRReducers } from "@egovernments/digit-ui-module-pgr";
import { PTModule, PTLinks } from "@egovernments/digit-ui-module-pt";
import { FSMModule, FSMLinks } from "@egovernments/digit-ui-module-fsm";
import { PaymentModule, PaymentLinks } from "@egovernments/digit-ui-module-common";
import { DigitUI } from "@egovernments/digit-ui-module-core";
// import { PGRModule, PGRLinks } from "@egovernments/digit-ui-module-pgr";
// import { Body, TopBar } from "@egovernments/digit-ui-react-components";
import "@egovernments/digit-ui-css/example/index.css";

import CITIZEN from "./userInfo/citizen.json";
import EMPLOYEE from "./userInfo/employee.json";
import LME from "./userInfo/lme.json";
import GRO from "./userInfo/gro.json";
import QAGRO from "./userInfo/qa-gro.json";
import QACSR from "./userInfo/qa-csr.json";
import QACT from "./userInfo/qa-citizen.json";
import FSM_EMPLOYEE from "./userInfo/fsm-employee.json";
import NAWANSHAHR_QA_GRO from "./userInfo/qa-gro-nawanshahr.json";

import * as comps from "@egovernments/digit-ui-react-components";

import Registry from "./ComponentRegistry";
import { subFormRegistry } from "@egovernments/digit-ui-libraries";

import { pgrCustomizations, pgrComponents } from "./pgr";

initLibraries();

const userInfo = { CITIZEN, EMPLOYEE, LME, GRO, QACSR, QACT, QAGRO, FSM_EMPLOYEE, NAWANSHAHR_QA_GRO };

const enabledModules = ["PGR", "FSM", "Payment", "PT"];
const registry = new Registry({
  ...pgrComponents,
  PGRLinks,
  PGRModule,
  FSMModule,
  FSMLinks,
  PaymentModule,
  PaymentLinks,
  PTModule,
  PTLinks,
});

const moduleReducers = (initData) => ({
  pgr: PGRReducers(initData),
});

window.Digit.Customizations = { PGR: pgrCustomizations };

const stateCode = globalConfigs.getConfig("STATE_LEVEL_TENANT_ID");

// console.log(stateCode);

const userType = window.sessionStorage.getItem("userType") || process.env.REACT_APP_USER_TYPE || "CITIZEN";

const token = process.env[`REACT_APP_${userType}_TOKEN`];

// console.log(token);

const citizenInfo = window.localStorage.getItem("Citizen.user-info") || userInfo[userType];

const citizenTenantId = window.localStorage.getItem("Citizen.tenant-id") || stateCode;

const employeeInfo = window.localStorage.getItem("Employee.user-info") || userInfo[userType];
const employeeTenantId = window.localStorage.getItem("Employee.tenant-id") || "pb.amritsar";

const userTypeInfo = userType === "CITIZEN" ? "citizen" : "employee";
window.Digit.SessionStorage.set("user_type", userTypeInfo);
window.Digit.SessionStorage.set("userType", userTypeInfo);

if (userType !== "CITIZEN") {
  window.Digit.SessionStorage.set("User", { access_token: token, info: employeeInfo });
}
// else {
//   window.Digit.SessionStorage.set("User", { access_token: token, info: citizenInfo });
// }

window.Digit.SessionStorage.set("Citizen.tenantId", citizenTenantId);
window.Digit.SessionStorage.set("Employee.tenantId", employeeTenantId);

window.mdmsInitPre = ({ params, data }) => {
  // console.log("mdms init pre", params, data);
  return { params, data };
};

window.mdmsInitPost = (data) => {
  // console.log("mdms init post", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

subFormRegistry.changeConfig("testForm", async (config) => {
  config.state = { ...config.state, firstDDoptions: ["j", "k", "l"] };
  config.fields[0] = {
    ...config.fields[0],
    defaultValue: "j",
  };
  // console.log(config);
  return config;
});

ReactDOM.render(
  <DigitUI stateCode={stateCode} registry={registry} enabledModules={enabledModules} moduleReducers={moduleReducers} />,
  document.getElementById("root")
);
