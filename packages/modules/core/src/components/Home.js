import React from "react";
import { Link } from "react-router-dom";
import { PGRLinks } from "@egovernments/digit-ui-module-pgr/src/Module";
import { FSMLinks } from "@egovernments/digit-ui-module-fsm/src/Module";
import ActionCard from "./dashboardCards/ActionCard";
import useDashboardData from "./hooks/useDashboardData";

const CitizenHome = ({ userType }) => (
  <React.Fragment>
    <PGRLinks matchPath={`/digit-ui/${userType}/pgr`} userType={userType} />
    <FSMLinks matchPath={`/digit-ui/${userType}/fsm`} userType={userType} />
  </React.Fragment>
);

// let links = [{text:"New Compplaints", link:""}]

// let stats = { total: { text: "Total", count: 120 }, remaining: { text: "Nearing SLA", count: "24" }, inbox: 12 };

const links = [{ text: "New Complaint", link: "/digit-ui/employee/pgr/complaint/create", accessTo: "CSR" }];

const EmployeeHome = ({ stats }) => <ActionCard type="dashboard" header="COMPLAINTS" links={links} stats={stats} />;

export const AppHome = ({ userType }) => {
  let data = useDashboardData();
  let { count } = data.count;

  let stats = { total: { text: "Total", count: count }, remaining: { text: "Nearing SLA", count: "24" }, inbox: 12 };
  if (userType === "citizen") {
    return <CitizenHome userType="citizen" />;
  }
  return <EmployeeHome stats={stats} />;
};
