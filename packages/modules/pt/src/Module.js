import React from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { CitizenApp } from "../src/pages/citizen";
import { EmployeeApp } from "../src/pages/employee";

export const PTModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "PT";

  if (userType === "citizen") {
    return <CitizenApp {...{ stateCode }} />;
  } else {
    return <EmployeeApp {...{ stateCode }} />;
  }
};
