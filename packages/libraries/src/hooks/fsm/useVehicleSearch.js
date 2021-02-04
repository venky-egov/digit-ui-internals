import { useQuery } from "react-query";
import VehicleSearch from "../../services/molecules/FSM/VehicleSearch";

const useVehicleSearch = (registrationNumber, tenantId) => {
  return useQuery("VEHICLE_SEARCH", () => VehicleSearch(registrationNumber, tenantId));
};

export default useVehicleSearch;
