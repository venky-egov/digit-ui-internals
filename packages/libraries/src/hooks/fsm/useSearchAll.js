import { Search } from "../../services/molecules/FSM/Search";
import { useQuery } from "react-query";

const useSearchAll = (tenantId, filters, queryFn, config = {}) => {
  const defaultSelect = (data) => data.fsm;
  return useQuery(["FSM_CITIZEN_SEARCH", filters], typeof queryFn === "function" ? queryFn : () => Search.all(tenantId, filters), {
    select: defaultSelect,
    ...config,
  });
};

export default useSearchAll;
