import { FSMService } from "../../elements/FSM";

const VehicleSearch = async (registrationNumber, tenantId) => {
  const response = await FSMService.vehicleSearch(registrationNumber, tenantId);
  const vehicleData = response.vehicle
    .filter((vehicles) => vehicles.status === "ACTIVE")
    .map((vehicle) => ({
      registrationNumber: vehicle.registrationNumber,
      type: vehicle.type,
      capacity: vehicle.tankCapicity,
      suctionType: vehicle.suctionType,
      model: vehicle.model,
    }));
  return vehicleData;
};

export default VehicleSearch;
