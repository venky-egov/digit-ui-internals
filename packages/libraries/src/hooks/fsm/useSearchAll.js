import { Search } from "../../services/molecules/FSM/Search";
import { useQuery } from "react-query";

const useSearchAll = (tenantId, filters, config = {}) => {
  return useQuery(["FSM_CITIZEN_SEARCH", filters], () => Search.all(tenantId, filters), config);
};

export default useSearchAll;
