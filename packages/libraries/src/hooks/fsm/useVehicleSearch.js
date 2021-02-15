import { useQuery } from "react-query";
import { Search } from "../../services/molecules/FSM/Search";

const useVehicleSearch = (args) => {
  const { tenantId, filters, config } = args;
  return useQuery(["FSM_VEHICLE_DATA", args], () => Search.allVehicles(tenantId, filters), config);
};

export default useVehicleSearch;
