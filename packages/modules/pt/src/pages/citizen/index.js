import React from "react";
import { MyApplications } from "./MyApplications";
import { MyBills } from "./MyBills";
import { BillDetails } from "./bill-details";

export const CitizenApp = ({}) => {
  //   return <MyApplications />;
  //   return <MyBills />;
  return <BillDetails application={{ uniquePropertyId: "456484498484", billingPeriod: "sdadsds" }} />;
};
