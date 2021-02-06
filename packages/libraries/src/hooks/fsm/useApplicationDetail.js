import { Search } from "../../services/molecules/FSM/Search";
import { useQuery } from "react-query";

const useApplicationDetail = (tenantId, applicationNos, config = {}) => {
  return useQuery(["FSM_CITIZEN_SEARCH", applicationNos], () => Search.applicationDetails(tenantId, applicationNos), config);
};

export default useApplicationDetail;
