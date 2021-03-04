import React from "react";
import { useQuery } from "react-query";
import { Search } from "../../services/molecules/FSM/Search";

const useCitizenApplicationDetails = (t, tenantId, applicationNos, config = {}) => {
  return useQuery(["FSM_CITIZEN_SEARCH", { tenantId, applicationNos }], () => Search.citizenApplicationDetails(t, tenantId, applicationNos), config);
};

export default useCitizenApplicationDetails;
