import React from "react";
import { useQuery } from "react-query";
import DsoDetails from "../../services/molecules/FSM/DsoDetails";

const useDsoSearch = (tenantId) => {
  return useQuery("DSO_SEARCH", () => DsoDetails(tenantId));
};

export default useDsoSearch;
