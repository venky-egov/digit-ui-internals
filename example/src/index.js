import React from "react";
import ReactDOM from "react-dom";

import { initLibraries } from "@egovernments/digit-ui-libraries";
import { DigitUI } from "@egovernments/digit-ui-module-core";
// import { PGRModule, PGRLinks } from "@egovernments/digit-ui-module-pgr";
// import { Body, TopBar } from "@egovernments/digit-ui-react-components";
import "@egovernments/digit-ui-css/example/index.css";

import CITIZEN from "./userInfo/citizen.json";
import EMPLOYEE from "./userInfo/employee.json";
import LME from "./userInfo/lme.json";

const userInfo = { CITIZEN, EMPLOYEE, LME };

initLibraries();

const userType = process.env.REACT_APP_USER_TYPE || "CITIZEN";

console.log(userType);

console.log(process.env[`REACT_APP_${userType}_TOKEN`]);

const token = window.localStorage.getItem("token") || process.env[`REACT_APP_${userType}_TOKEN`];

const citizenInfo = window.localStorage.getItem("Citizen.user-info") || userInfo[userType];
const citizenTenantId = window.localStorage.getItem("Citizen.tenant-id") || "pb";

const employeeInfo = window.localStorage.getItem("Employee.user-info") || userInfo[userType];
const employeeTenantId = window.localStorage.getItem("Employee.tenant-id") || "pb.amritsar";

const userTypeInfo = userType === "CITIZEN" ? "citizen" : "employee";
window.Digit.SessionStorage.set("user_type", userTypeInfo);
window.Digit.SessionStorage.set("userType", userTypeInfo);

const userDetails = { token, info: userType === "CITIZEN" ? citizenInfo : employeeInfo };
// console.log(token)
window.Digit.SessionStorage.set("User", userDetails);

window.Digit.SessionStorage.set("Citizen.tenantId", citizenTenantId);
window.Digit.SessionStorage.set("Employee.tenantId", employeeTenantId);

const comp = (props) => (
  <div>
    <span>{props.name}</span>
    <br />
    <button
      onClick={() => {
        props.prevStep();
      }}
    >
      prev
    </button>
    <br />
    <button
      onClick={() => {
        props.nextStep();
      }}
    >
      next
    </button>
  </div>
);

// window.Digit.deltaComplaintArr = [
//   {
//     component: comp,
//     step: 2,
//     props: { name: "step 2" },
//   },
//   {
//     component: comp,
//     step: 4,
//     props: { name: "step 4" },
//   },
//   {
//     defaultStep: 3,
//     remove: true,
//   },
//   {
//     defaultStep: 1,
//     remove: true,
//   },
// ];

ReactDOM.render(<DigitUI stateCode="pb" />, document.getElementById("root"));
