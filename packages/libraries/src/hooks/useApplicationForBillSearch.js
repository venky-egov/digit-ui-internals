import { FSMService } from "../services/elements/FSM";
import { PTService } from "../services/elements/PT";

import { useQuery } from "react-query";

const fsmApplications = async (tenantId, filters) => {
  return (await FSMService.search(tenantId, { ...filters, limit: 10000 })).fsm;
};

const ptApplications = async (tenantId, filters) => {
  return (await PTService.search({ tenantId, filters })).Properties;
};

export const useApplicationsForBusinessServiceSearch = ({ tenantId, businessService, filters }, config = {}) => {
  const callPT = businessService?.toLowerCase().split(".")[0].includes("pt");
  const callFSM = businessService?.toLowerCase().split(".")[0].includes("fsm");

  let searchFn;

  /* key from application ie being used as consumer code in bill */
  let key;
  let label;

  if (callFSM) {
    searchFn = () => fsmApplications(tenantId, filters);
    key = "applicationNo";
    label = "FSM_APPLICATION_NO";
  } else if (callPT) {
    searchFn = () => ptApplications(tenantId, filters);
    key = "propertyId";
    label = "PT_UNIQUE_PROPERTY_ID";
  }
  const applications = useQuery(["applicationsForBillDetails", { tenantId, businessService, filters }], searchFn, {
    ...config,
  });
  return { ...applications, key, label };
};
