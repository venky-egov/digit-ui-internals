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

import pgrCustomizations from "./pgr";

const userInfo = { CITIZEN, EMPLOYEE, LME };

initLibraries();

window.Digit.Customizations = { PGR: pgrCustomizations };

const userType = "EMPLOYEE";

const token = "78fcbf97-d542-4e64-8b8b-7938d4f18fc3";

const citizenInfo = window.localStorage.getItem("Citizen.user-info") || userInfo[userType];
const citizenTenantId = window.localStorage.getItem("Citizen.tenant-id") || "pb";

const employeeInfo = window.localStorage.getItem("Employee.user-info") || userInfo[userType];
const employeeTenantId = window.localStorage.getItem("Employee.tenant-id") || "pb.amritsar";

const userTypeInfo = userType === "CITIZEN" ? "citizen" : "employee";
window.Digit.SessionStorage.set("user_type", userTypeInfo);
window.Digit.SessionStorage.set("userType", userTypeInfo);

const userDetails = { token, info: userType === "CITIZEN" ? citizenInfo : employeeInfo };

window.Digit.SessionStorage.set("User", userDetails);

window.Digit.SessionStorage.set("Citizen.tenantId", citizenTenantId);
window.Digit.SessionStorage.set("Employee.tenantId", employeeTenantId);

ReactDOM.render(<DigitUI stateCode="pb" />, document.getElementById("root"));
