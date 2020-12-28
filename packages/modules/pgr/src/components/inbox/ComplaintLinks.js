import { Card } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import ActionCard from "../../../../core/src/components/dashboardCards/ActionCard";
import ActionLinks from "../../../../core/src/components/dashboardCards/ActionLinks";

const ComplaintsLink = ({ isMobile, data }) => {
  const allLinks = [
    { text: "New Complaint", link: "/digit-ui/employee/pgr/complaint/create", accessTo: "CSR" },
    { text: "Reports", link: "/employee" },
    { text: "Dashboard", link: "/dashboard" },
  ];

  return (
    <React.Fragment>
      <ActionCard type="inbox" header="Complaints" links={allLinks} />
    </React.Fragment>
  );
};

export default ComplaintsLink;
