import { useQuery } from "react-query";
import { FSMService } from "../../services/elements/FSM";

const useVehicleSearch = (registrationNumber, tenantId) => {
  return useQuery("VEHICLE_SEARCH", () => FSMService.vehicleSearch(registrationNumber, tenantId));
};

export default useVehicleSearch;
