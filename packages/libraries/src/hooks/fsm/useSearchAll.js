import { Search } from "../../services/molecules/FSM/Search";
import { useQuery } from "react-query";

const useSearchAll = (tenantId, filters, queryFn) => {
  return useQuery(["FSM_CITIZEN_SEARCH", filters], typeof queryFn === "function" ? queryFn : () => Search.all(tenantId, filters));
};

export default useSearchAll;
